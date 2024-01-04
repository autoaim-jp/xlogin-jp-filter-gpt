/* /lib.js */
const mod = {}

const init = (axios, http, https, crypto, winston) => {
  mod.crypto = crypto
  mod.http = http
  mod.https = https
  mod.axios = axios
  mod.winston = winston
}

const objToQuery = (obj) => {
  return Object.entries(obj).map(([key, value]) => { return `${key}=${value}` }).join('&')
}

const _calcSha256AsB64 = (str) => {
  const sha256 = mod.crypto.createHash('sha256')
  sha256.update(str)
  return sha256.digest('base64')
}
const _calcSha256HmacAsB64 = (secret, str) => {
  const sha256Hmac = mod.crypto.createHmac('sha256', secret)
  sha256Hmac.update(str)
  return sha256Hmac.digest('base64')
}


const apiRequest = (isPost, origin, path, param = {}, header = {}, json = true) => {
  return new Promise((resolve) => {
    const query = param && objToQuery(param)
    const queryString = query ? `?${query}` : ''
    const pathWithQueryString = `${path}${isPost ? '' : queryString}`
    const contentHash = _calcSha256AsB64(JSON.stringify(isPost ? param : {}))
    const timestamp = Date.now()
    const dataToSign = `${timestamp}:${pathWithQueryString}:${contentHash}`
    const signature = _calcSha256HmacAsB64(process.env.CLIENT_SECRET, dataToSign)
    const url = origin + pathWithQueryString

    const opt = {
      method: isPost ? 'POST' : 'GET',
      url,

      headers: {
        ...header,
        'x-xlogin-timestamp': timestamp,
        'x-xlogin-signature': signature,
        'tmp-dataToSign': dataToSign,
      },
      timeout: 30 * 1000,
    }
    if (json) {
      opt.responseType = 'json'
    }
    if (isPost && param) {
      opt.data = json ? param : param.toString()
    }
    mod.axios(opt)
      .then((res) => {
        resolve({ res, data: res.data })
      })
      .catch((error) => {
        resolve({ error })
      })
  })
}

const postRequest = (clientId, accessToken, origin, path, param) => {
  const header = {
    authorization: `Bearer ${accessToken}`,
    'x-xlogin-client-id': clientId,
  }
  return apiRequest(true, origin, path, param, header)
}

const getRequest = (clientId, accessToken, origin, path, param) => {
  const header = {
    authorization: `Bearer ${accessToken}`,
    'x-xlogin-client-id': clientId,
  }
  return apiRequest(false, origin, path, param, header)
}

const getFileRequest = (clientId, accessToken, origin, path, param) => {
  return new Promise((resolve) => {
    const header = {
      authorization: `Bearer ${accessToken}`,
      'x-xlogin-client-id': clientId,
    }
    const query = param && objToQuery(param)
    const queryString = query ? `?${query}` : ''
    const pathWithQueryString = `${path}${queryString}`
    const contentHash = _calcSha256AsB64(JSON.stringify({}))
    const timestamp = Date.now()
    const dataToSign = `${timestamp}:${pathWithQueryString}:${contentHash}`
    const signature = _calcSha256HmacAsB64(process.env.CLIENT_SECRET, dataToSign)
    const url = origin + pathWithQueryString

    const opt = {
      method: 'GET',
      url,
      responseType: 'arraybuffer',

      headers: {
        ...header,
        'x-xlogin-timestamp': timestamp,
        'x-xlogin-signature': signature,
        'tmp-dataToSign': dataToSign,
      },
      timeout: 30 * 1000,
    }
    mod.axios(opt)
      .then((res) => {
        resolve({ res, data: res.data })
      })
      .catch((error) => {
        resolve({ error })
      })
  })
}

const postFormRequest = (clientId, accessToken, origin, path, formData) => {
  return new Promise((resolve) => {
    const header = {
      authorization: `Bearer ${accessToken}`,
      'x-xlogin-client-id': clientId,
    }
    const content = { contentType: formData.getHeaders()['content-type'] }
    const contentHash = _calcSha256AsB64(JSON.stringify(content))
    const timestamp = Date.now()
    const dataToSign = `${timestamp}:${path}:${contentHash}`
    const signature = _calcSha256HmacAsB64(process.env.CLIENT_SECRET, dataToSign)

    const parsedUrl = new URL(origin)
    let request = null
    if (origin.indexOf('https') === 0) {
      request = mod.https.request({
        method: 'post',
        host: parsedUrl.host,
        path,
        headers: {
          ...header,
          'x-xlogin-timestamp': timestamp,
          'x-xlogin-signature': signature,
          'tmp-dataToSign': dataToSign,
          ...formData.getHeaders(),
        },
      })
    } else {
      request = mod.http.request({
        method: 'post',
        host: parsedUrl.host,
        port: parsedUrl.port,
        path,
        headers: {
          ...header,
          'x-xlogin-timestamp': timestamp,
          'x-xlogin-signature': signature,
          'tmp-dataToSign': dataToSign,
          ...formData.getHeaders(),
        },
      })
    }

    formData.pipe(request)

    request.on('response', (res) => {
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        resolve(data)
      })
    })
    request.on('error', (err) => {
      logger.error('postFormRequest', { err })
      resolve(null)
    })
  })
}

/**
 * 名前付きの引数を展開する
 *
 * @param {Object} obj
 * @return {object} 名前がついている引数を展開したもの
 * @memberof lib
 */
const _argNamed = (obj) => {
  const flattened = {}

  Object.keys(obj).forEach((key) => {
    if (Array.isArray(obj[key])) {
      Object.assign(flattened, obj[key].reduce((prev, curr) => {
        if (typeof curr === 'undefined') {
          throw new Error(`[error] flat argument by list can only contain function but: ${typeof curr} @${key}\n===== maybe you need make func exported like  module.exports = { func, } =====`)
        } else if (typeof curr === 'function') {
          prev[curr.name] = curr
        } else {
          throw new Error(`[error] flat argument by list can only contain function but: ${typeof curr} @${key}`)
        }
        return prev
      }, {}))
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(flattened, obj[key])
    } else {
      flattened[key] = obj[key]
    }
  })

  return flattened
}

const _createGlobalLogger = ({ SERVICE_NAME }) => {
  const logger = mod.winston.createLogger({
    level: 'info',
    format: mod.winston.format.json(),
    defaultMeta: { service: SERVICE_NAME },
    transports: [
      new mod.winston.transports.Console({ level: 'debug' }),
      new mod.winston.transports.File({ filename: 'log/combined.log', level: 'info' }),
    ],
  })
  return logger
}


/**
 * グローバルの関数をセットする。
 *
 * @return {undefined} 戻り値なし
 * @memberof lib
 */
const monkeyPatch = ({ SERVICE_NAME }) => {
  global.argNamed = _argNamed
  global.logger = _createGlobalLogger({ SERVICE_NAME })
}


export default {
  init,
  postRequest,
  getRequest,
  apiRequest,

  getFileRequest,
  postFormRequest,

  monkeyPatch,
}

