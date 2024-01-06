/* mypage/input.js */

export const getPromptValue = () => {
  const sendPromptInputElm = document.querySelector('#sendPromptInput')
  return sendPromptInputElm.value
}

export const getFetchChatList = ({ apiEndpoint, getRequest }) => {
  return () => {
    const url = `${apiEndpoint}/chat/list`
    return getRequest(url)
  }
}

export const getFetchResponseList = ({ apiEndpoint, getRequest }) => {
  return ({ requestIdListStr }) => {
    const url = `${apiEndpoint}/response/list`
    const param = { requestIdListStr }
    return getRequest(url, param)
  }
}


export default {}

