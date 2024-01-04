/* /action.js */

const getHandlerTimerAdd = ({ handleTimerAdd, createResponse }) => {
  return async (req, res) => {
    const { accessToken } = req.session.auth

    const handleResult = await handleTimerAdd({ accessToken })

    createResponse({ req, res, handleResult })
  }
}

const getHandlerNotificationOpen = ({ handleNotificationOpen, createResponse }) => {
  return async (req, res) => {
    const { accessToken } = req.session.auth
    const { notificationIdList } = req.body

    const handleResult = await handleNotificationOpen({ accessToken, notificationIdList })

    createResponse({ req, res, handleResult })
  }
}

const getHandlerNotificationList = ({ handleInvalidSession, handleNotificationList, createResponse }) => {
  return async (req, res) => {
    if (handleInvalidSession({ req, res })) {
      return
    }

    const { accessToken } = req.session.auth

    const handleResult = await handleNotificationList({ accessToken })

    createResponse({ req, res, handleResult })
  }
}

const getHandlerMessageSave = ({ handleMessageSave, createResponse }) => {
  return async (req, res) => {
    const { accessToken } = req.session.auth
    const { message } = req.body

    const handleResult = await handleMessageSave({ accessToken, message })

    createResponse({ req, res, handleResult })
  }
}

const getHandlerMessageContent = ({ handleMessageContent, createResponse }) => {
  return async (req, res) => {
    const { accessToken } = req.session.auth

    const handleResult = await handleMessageContent({ accessToken })

    createResponse({ req, res, handleResult })
  }
}

const getHandlerMessageDelete = ({ handleMessageDelete, createResponse }) => {
  return async (req, res) => {
    const { accessToken } = req.session.auth

    const handleResult = await handleMessageDelete({ accessToken })

    createResponse({ req, res, handleResult })
  }
}

const getHandlerFileList = ({ handleFileList, createResponse }) => {
  return async (req, res) => {
    const { accessToken } = req.session.auth

    const handleResult = await handleFileList({ accessToken })

    createResponse({ req, res, handleResult })
  }
}

const getHandlerFileContent = ({ handleFileContent }) => {
  return async (req, res) => {
    const { accessToken } = req.session.auth
    const { fileLabel } = req.query

    const fileContentGetResult = await handleFileContent({ accessToken, fileLabel })

    res.end(fileContentGetResult.res.data)
  }
}


const getHandlerSplitPermissionList = ({ handleInvalidSession, handleSplitPermissionList, createResponse }) => {
  return async (req, res) => {
    if (handleInvalidSession({ req, res })) {
      return
    }

    const { splitPermissionList } = req.session.auth

    const handleResult = await handleSplitPermissionList({ splitPermissionList })

    createResponse({ req, res, handleResult })
  }
}

const getHandlerUpdateBackupEmailAddress = ({ handleUpdateBackupEmailAddress, createResponse }) => {
  return async (req, res) => {
    const { accessToken } = req.session.auth
    const { backupEmailAddress } = req.body

    const handleResult = await handleUpdateBackupEmailAddress({ accessToken, backupEmailAddress })

    createResponse({ req, res, handleResult })
  }
}

const getHandlerUploadFile = ({
  handleUploadFile, createResponse, multer, FormData, Readable,
}) => {
  return async (req, res) => {
    const { accessToken } = req.session.auth

    const handleResult = await handleUploadFile({
      req, accessToken, multer, FormData, Readable,
    })

    createResponse({ req, res, handleResult })
  }
}

export default {
  getHandlerTimerAdd,

  getHandlerNotificationOpen,
  getHandlerNotificationList,

  getHandlerMessageSave,
  getHandlerMessageContent,
  getHandlerMessageDelete,

  getHandlerFileList,
  getHandlerFileContent,

  getHandlerSplitPermissionList,

  getHandlerUpdateBackupEmailAddress,

  getHandlerUploadFile,
}

