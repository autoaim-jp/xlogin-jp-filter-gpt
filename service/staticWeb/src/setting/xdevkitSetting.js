/* /setting/xdevkitSetting.js */

const setting = {}
setting.session = {}
setting.session.SESSION_ID = 'sid'
setting.session.SESSION_COOKIE_SECURE = false
setting.session.REDIS_PORT = 6379
setting.session.REDIS_HOST = 'redis_container'
setting.session.REDIS_DB = 2

setting.api = {}
setting.api.API_VERSION = 'v0.1.0'
setting.api.STATE_L = 64
setting.api.CODE_VERIFIER_L = 64
setting.api.XLOGIN_RESPONSE_TYPE = 'code'
setting.api.XLOGIN_CODE_CHALLENGE_METHOD = 'S256'
setting.api.SCOPE = 'r:auth:emailAddress,rw:auth:backupEmailAddress,*r:auth:userName,*r:$CLIENT_ID:serviceUserId,*rw:$CLIENT_ID:notification,rw:$CLIENT_ID:file_v1,rw:$CLIENT_ID:json_v1'

setting.url = {}
setting.url.ERROR_PAGE = '/error'
setting.url.XLOGIN_AUTHORIZATION_ENDPOINT = '/f/auth/connect'
setting.url.XLOGIN_CODE_ENDPOINT = '/f/auth/code'
setting.url.XLOGIN_USER_INFO_ENDPOINT = `/api/${setting.api.API_VERSION}/user/info`
setting.url.XLOGIN_REDIRECT_URI = encodeURIComponent('/f/xlogin/callback')


const init = (env) => {
  setting.env = {}
  setting.env.SERVER_ORIGIN = env.SERVER_ORIGIN
  setting.env.AUTH_SERVER_ORIGIN = env.AUTH_SERVER_ORIGIN
  setting.env.API_SERVER_ORIGIN = env.API_SERVER_ORIGIN
  setting.env.CLIENT_ID = env.CLIENT_ID

  setting.api.SCOPE = setting.api.SCOPE.replace(/\$CLIENT_ID/g, env.CLIENT_ID)
}

const getList = (...keyList) => {
  /* eslint-disable no-param-reassign */
  const constantList = keyList.reduce((prev, key) => {
    let value = setting
    for (const keySplit of key.split('.')) {
      value = value[keySplit]
    }
    prev[key.slice(key.lastIndexOf('.') + 1)] = value
    return prev
  }, {})
  for (const key of keyList) {
    if (constantList[key.slice(key.lastIndexOf('.') + 1)] === undefined) {
      throw new Error(`[error] undefined setting constant: ${key}`)
    }
  }
  return constantList
}

const getValue = (key) => {
  let value = setting
  for (const keySplit of key.split('.')) {
    value = value[keySplit]
  }
  return value
}

export default {
  init,
  getList,
  getValue,
}

