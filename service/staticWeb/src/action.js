/* /action.js */

export const getHandlerSplitPermissionList = ({ handleInvalidSession, handleSplitPermissionList, createResponse }) => {
  return async (req, res) => {
    if (handleInvalidSession({ req, res })) {
      return
    }

    const { splitPermissionList } = req.session.auth

    const handleResult = await handleSplitPermissionList({ splitPermissionList })

    createResponse({ req, res, handleResult })
  }
}

export const getHandlerSendDraft = ({ handleSendDraft, createResponse }) => {
  return async (req, res) => {
    const { accessToken } = req.session.auth
    const { draft } = req.body

    const handleResult = await handleSendDraft({ accessToken, draft })

    createResponse({ req, res, handleResult })
  }
}


export const getHandlerPromptSend = ({ handlePromptSend, createResponse }) => {
  return async (req, res) => {
    const { accessToken } = req.session.auth
    const { prompt } = req.body

    const handleResult = await handlePromptSend({ accessToken, prompt })

    createResponse({ req, res, handleResult })
  }
}

export const getHandlerChatListUpdate = ({ handleChatListUpdate, createResponse }) => {
  return async (req, res) => {
    const { accessToken } = req.session.auth
    const { chatList } = req.body

    const handleResult = await handleChatListUpdate({ accessToken, chatList })

    createResponse({ req, res, handleResult })
  }
}


export const getHandlerChatList = ({ handleInvalidSession, handleChatList, createResponse }) => {
  return async (req, res) => {
    if (handleInvalidSession({ req, res })) {
      return
    }

    const { accessToken } = req.session.auth

    const handleResult = await handleChatList({ accessToken })

    createResponse({ req, res, handleResult })
  }
}

export const getHandlerLookupResponseList = ({ handleInvalidSession, handleLookupResponseList, createResponse }) => {
  return async (req, res) => {
    if (handleInvalidSession({ req, res })) {
      return
    }

    const { accessToken } = req.session.auth
    const { requestIdListStr } = req.query

    const handleResult = await handleLookupResponseList({ accessToken, requestIdListStr })

    createResponse({ req, res, handleResult })
  }
}


export default {}

