/* /output.js */

export const textConvertRequest = ({
  accessToken, CLIENT_ID, API_VERSION, API_SERVER_ORIGIN, postRequest, message,
}) => {
  const path = `/api/${API_VERSION}/text-lib/parse`
  const param = {
    message,
  }

  return postRequest(CLIENT_ID, accessToken, API_SERVER_ORIGIN, path, param)
}


export const promptSendRequest = ({
  accessToken, prompt, CLIENT_ID, API_VERSION, API_SERVER_ORIGIN, postRequest,
}) => {
  const path = `/api/${API_VERSION}/chatgpt/prompt`
  const param = {
    prompt,
  }

  return postRequest(CLIENT_ID, accessToken, API_SERVER_ORIGIN, path, param)
}

export const fileSaveRequest = ({
  accessToken, message, CHATGPT_FILE_PATH, CLIENT_ID, API_VERSION, API_SERVER_ORIGIN, postRequest,
}) => {
  const path = `/api/${API_VERSION}/json/update`
  const param = {
    owner: CLIENT_ID,
    jsonPath: CHATGPT_FILE_PATH,
    content: message,
  }

  return postRequest(CLIENT_ID, accessToken, API_SERVER_ORIGIN, path, param)
}


/* to http client */
export const endResponse = ({
  res, json, redirect, ERROR_PAGE,
}) => {
  if (redirect) {
    return res.redirect(redirect)
  } if (json) {
    return res.json(json)
  }
  return res.redirect(ERROR_PAGE)
}

export default {}

