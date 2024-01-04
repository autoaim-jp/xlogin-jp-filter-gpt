/* mypage/input.js */
export const fetchUserProfile = ({ apiEndpoint, getRequest }) => {
  const url = `${apiEndpoint}/user/profile`
  return getRequest(url)
}

export const fetchMessage = ({ apiEndpoint, getRequest }) => {
  const url = `${apiEndpoint}/message/content`
  return getRequest(url)
}


export const getBackupEmailAddress = ({ userInfoResult }) => {
  const backupEmailAddress = userInfoResult?.userInfo?.public?.['auth:backupEmailAddress']
  return backupEmailAddress || ''
}

export const getFetchUploadedFileList = ({ apiEndpoint, getRequest }) => {
  return () => {
    const url = `${apiEndpoint}/file/list`
    return getRequest(url)
  }
}


export default {}

