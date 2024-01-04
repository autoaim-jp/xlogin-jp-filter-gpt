/* /_lib/_common/input.js */

/* request */
export const getRequest = (_url, param = {}) => {
  const query = param && Object.keys(param).map((key) => { return `${key}=${param[key]}` }).join('&')
  const url = query ? `${_url}?${query}` : _url
  const opt = {
    method: 'GET',
    credentials: 'same-origin',
    timeout: 30 * 1000,
  }
  return fetch(url, opt).then((res) => {
    if (res.error || !res.body || !res.json) {
      return null
    }
    return res.json()
  }).then((json) => {
    console.log({ _url, json })
    return json
  }).catch((e) => {
    console.error('[fatal] error @getRequest:', e)
    return null
  })
}

/* permission */
export const fetchSplitPermissionList = (apiEndpoint) => {
  const url = `${apiEndpoint}/session/splitPermissionList`
  return getRequest(url)
}

