/* create elm */

/* request */
export const getSendPrompt = ({ apiEndpoint, getPromptValue, postRequest }) => {
  const url = `${apiEndpoint}/prompt/send`
  return () => {
    const prompt = getPromptValue()
    const param = { prompt }
    return postRequest(url, param)
  }
}

export const getUpdateChatList = ({ apiEndpoint, postRequest }) => {
  const url = `${apiEndpoint}/chat/update`
  return ({ newChatList }) => {
    const param = { chatList: newChatList }
    return postRequest(url, param)
  }
}


/* onClick */
export const setOnClickSaveMessageButton = ({ onClickSaveMessageButton }) => {
  const saveMessageBtn = document.querySelector('#saveMessageBtn')
  saveMessageBtn.onclick = (e) => {
    e.preventDefault()
    onClickSaveMessageButton()
  }
}

/* onSubmit */
export const setOnSubmitSendPromptForm = ({ onSubmitSendPromptForm }) => {
  const sendPromptFormElm = document.querySelector('#sendPromptForm')
  sendPromptFormElm.onsubmit = (e) => {
    e.preventDefault()
    onSubmitSendPromptForm()
  }
}

/* show data */
const rightMessageTemplateElm = document.querySelector('#rightMessageTemplate')
const leftMessageTemplateElm = document.querySelector('#leftMessageTemplate')
export const showChatList = ({ simpleChatList }) => {
  /* simpleChatList has { isUpdated, chatList } */
  if (!simpleChatList || !simpleChatList.isUpdated) {
    return
  }

  const chatAreaElm = document.querySelector('#chatArea')
  simpleChatList.chatList.forEach((chatObj) => {
    /* chatobj has { chatId, isMine, text } */
    let chatElm = document.querySelector(`[data-chat-id="${chatObj.chatId}"]`)
    if (!chatElm) {
      if (chatObj.isMine) {
        chatElm = rightMessageTemplateElm.cloneNode(true)
      } else {
        chatElm = leftMessageTemplateElm.cloneNode(true)
      }
      chatElm.id = ''
      chatElm.classList.remove('hidden')
      chatElm.dataset.chatId = chatObj.chatId
      chatAreaElm.appendChild(chatElm)
    }

    if (chatObj.text) {
      chatElm.querySelector('[data-id="messageBody"]').innerText = chatObj.text
    } else {
      chatElm.querySelector('[data-id="messageBody"]').innerText = '...'
    }
  })
}

export const showChatHistory = ({ splitPermissionListResult }) => {
  const { splitPermissionList, clientId } = splitPermissionListResult.result
  if (splitPermissionList.optional[`rw:${clientId}:json_v1`]) {
    document.querySelector('#chatArea').classList.remove('hidden')
  } else {
    document.querySelector('#jsonPermissionRequestContainer').classList.remove('hidden')
  }
}

export const showPromptForm = ({ splitPermissionListResult }) => {
  const { splitPermissionList, clientId } = splitPermissionListResult.result
  if (splitPermissionList.optional[`rw:${clientId}:chatgpt`]) {
    document.querySelector('#sendPromptForm').classList.remove('hidden')
  } else {
    document.querySelector('#chatgptPermissionRequestContainer').classList.remove('hidden')
  }
}

export const clearPromptValue = () => {
  const sendPromptInputElm = document.querySelector('#sendPromptInput')
  sendPromptInputElm.value = ''
}

