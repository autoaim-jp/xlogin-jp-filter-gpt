/* /core.js */
/**
 * @name コア機能を集約したファイル
 * @memberof file
 */

/* local setting */
const mod = {}

export const init = (setting, output, input, lib) => {
  mod.setting = setting
  mod.output = output
  mod.input = input
  mod.lib = lib
}

export const handleSplitPermissionList = async ({ splitPermissionList }) => {
  const clientId = mod.setting.xdevkitSetting.getValue('env.CLIENT_ID')
  const result = { splitPermissionList, clientId }

  const status = mod.setting.browserServerSetting.getValue('statusList.OK')

  const handleResult = { response: { status, result } }
  return handleResult
}

/* draftをmecabで変換 */
export const handleSendDraft = async ({ accessToken, draft }) => {
  const textConvertResponse = await mod.output.textConvertRequest(argNamed({
    param: { accessToken, message: draft },
    xdevkitSetting: mod.setting.xdevkitSetting.getList('api.API_VERSION', 'env.API_SERVER_ORIGIN', 'env.CLIENT_ID'),
    lib: [mod.lib.postRequest],
  }))

  console.log({ result: textConvertResponse.data.result })

  const status = mod.setting.browserServerSetting.getValue('statusList.OK')
  const { parsedResult } = textConvertResponse.data.result.result

  const promptWordList = []
  const wordObjList = parsedResult.split('\n')
  wordObjList.forEach((wordObjList) => {
    const wordList = wordObjList.split(',')
    if (wordList.length < 2 ) {
      promptWordList.push(['\n'])
      return
    }
    if (wordList[2] === '固有名詞') {
      promptWordList.push([wordList[0], 'A'])
    } else {
      promptWordList.push([wordList[0]])
    }
  })

  const result = { promptWordList }

  const handleResult = { response: { status, result, } }
  return handleResult
}


/* promptをchatgptに登録。requestIdと生成したchatIdを返す。 */
export const handlePromptSend = async ({ accessToken, prompt }) => {
  const promptSendResponse = await mod.output.promptSendRequest(argNamed({
    param: { accessToken, prompt },
    xdevkitSetting: mod.setting.xdevkitSetting.getList('api.API_VERSION', 'env.API_SERVER_ORIGIN', 'env.CLIENT_ID'),
    lib: [mod.lib.postRequest],
  }))
  console.log({ promptSendResponse })
  if (!promptSendResponse || !promptSendResponse.data || !promptSendResponse.data.result) {
    const status = mod.setting.browserServerSetting.getValue('statusList.INVALID')
    return { response: { status } }
  }

  console.log('result:', promptSendResponse?.data?.result)

  const { requestId } = promptSendResponse.data.result
  const promptChatId = mod.lib.getUlid()
  const responseChatId = mod.lib.getUlid()

  const result = { requestId, promptChatId, responseChatId }
  const handleResult = { response: { status: mod.setting.browserServerSetting.getValue('statusList.OK'), result } }
  return handleResult
}

/* chatListのjsonを取得。 */
export const handleChatList = async ({ accessToken }) => {
  const fileGetResponse = await mod.input.fileGetRequest(argNamed({
    param: { accessToken },
    xdevkitSetting: mod.setting.xdevkitSetting.getList('api.API_VERSION', 'env.API_SERVER_ORIGIN', 'env.CLIENT_ID'),
    setting: mod.setting.getList('user.CHATGPT_FILE_PATH'),
    lib: [mod.lib.getRequest],
  }))

  console.log({ fileGetResponse })
  if (!fileGetResponse || !fileGetResponse.data || !fileGetResponse.data.result) {
    const status = mod.setting.browserServerSetting.getValue('statusList.INVALID')
    return { response: { status } }
  }
  console.log('result:', fileGetResponse?.data?.result)

  const chatList = fileGetResponse.data.result.jsonContent || {}
  const result = { chatList }

  const handleResult = { response: { status: mod.setting.browserServerSetting.getValue('statusList.OK'), result } }
  return handleResult
}

/* chatListのjsonを更新。 */
export const handleChatListUpdate = async ({ accessToken, chatList }) => {
  const message = chatList

  const fileSaveResponse = await mod.output.fileSaveRequest(argNamed({
    param: { accessToken, message },
    xdevkitSetting: mod.setting.xdevkitSetting.getList('api.API_VERSION', 'env.API_SERVER_ORIGIN', 'env.CLIENT_ID'),
    setting: mod.setting.getList('user.CHATGPT_FILE_PATH'),
    lib: [mod.lib.postRequest],
  }))

  console.log({ fileSaveResponse })
  if (!fileSaveResponse || !fileSaveResponse.data || !fileSaveResponse.data.result) {
    const status = mod.setting.browserServerSetting.getValue('statusList.INVALID')
    return { response: { status } }
  }
  console.log('result:', fileSaveResponse?.data?.result)

  const handleResult = { response: { status: mod.setting.browserServerSetting.getValue('statusList.OK') } }
  return handleResult
}

/* requestIdのリストでresponseを探す。 */
export const handleLookupResponseList = async ({ accessToken, requestIdListStr }) => {
  const responseListResponse = await mod.input.lookupResponseListRequest(argNamed({
    param: { accessToken, requestIdListStr },
    xdevkitSetting: mod.setting.xdevkitSetting.getList('api.API_VERSION', 'env.API_SERVER_ORIGIN', 'env.CLIENT_ID'),
    lib: [mod.lib.getRequest],
  }))

  console.log({ responseListResponse })

  if (!responseListResponse || !responseListResponse.data) {
    const status = mod.setting.browserServerSetting.getValue('statusList.INVALID_SESSION')
    const result = {}
    const handleResult = { response: { status, result } }
    return handleResult
  }

  const { result } = responseListResponse.data
  const status = mod.setting.browserServerSetting.getValue('statusList.OK')

  const handleResult = { response: { status, result } }
  return handleResult
}

export const createResponse = ({ req, res, handleResult }) => {
  console.log('endResponse:', req.url, handleResult)
  // req.session.auth = handleResult.session

  const ERROR_PAGE = mod.setting.xdevkitSetting.getValue('url.ERROR_PAGE')
  const { redirect } = handleResult

  if (handleResult.response) {
    const json = handleResult.response
    return mod.output.endResponse({ res, json, ERROR_PAGE })
  }

  if (req.method === 'GET') {
    if (handleResult.redirect) {
      return mod.output.endResponse({ res, redirect: handleResult.redirect, ERROR_PAGE })
    }

    return mod.output.endResponse({ res, redirect: ERROR_PAGE, ERROR_PAGE })
  }

  if (redirect) {
    const json = { redirect }
    return mod.output.endResponse({ res, json, ERROR_PAGE })
  }

  const json = { redirect: ERROR_PAGE }
  return mod.output.endResponse({ res, json, ERROR_PAGE })
}

export const handleInvalidSession = ({ req, res }) => {
  if (!req.session || !req.session.auth) {
    const status = mod.setting.browserServerSetting.getValue('statusList.INVALID_SESSION')
    return res.json({ status })
  }

  return null
}

export default {}

