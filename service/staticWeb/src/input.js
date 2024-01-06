/* /input.js */

export const lookupResponseListRequest = async ({
  accessToken, CLIENT_ID, API_VERSION, API_SERVER_ORIGIN, getRequest, requestIdListStr,
}) => {
  const origin = API_SERVER_ORIGIN
  const path = `/api/${API_VERSION}/chatgpt/response`
  const param = { requestIdListStr }
  return getRequest(CLIENT_ID, accessToken, origin, path, param)
}

export const fileGetRequest = async ({
  accessToken, CHATGPT_FILE_PATH, CLIENT_ID, API_VERSION, API_SERVER_ORIGIN, getRequest,
}) => {
  const origin = API_SERVER_ORIGIN
  const path = `/api/${API_VERSION}/json/content`
  const param = {
    owner: CLIENT_ID,
    jsonPath: CHATGPT_FILE_PATH,
  }
  return getRequest(CLIENT_ID, accessToken, origin, path, param)
}


export default {}

