/* create elm */

/* request */
export const getSendDraft = ({ apiEndpoint, getDraftValue, postRequest }) => {
  const url = `${apiEndpoint}/draft/send`
  return () => {
    const draft = getDraftValue()
    const param = { draft }
    return postRequest(url, param)
  }
}

export const getSendPrompt = ({ apiEndpoint, postRequest }) => {
  const url = `${apiEndpoint}/prompt/send`
  return ({ prompt }) => {
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
export const setOnSubmitSendDraftForm = ({ onSubmitSendDraftForm }) => {
  const sendDraftFormElm = document.querySelector('#sendDraftForm')
  sendDraftFormElm.onsubmit = (e) => {
    e.preventDefault()
    onSubmitSendDraftForm()
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
    document.querySelector('#sendDraftForm').classList.remove('hidden')
  } else {
    document.querySelector('#chatgptPermissionRequestContainer').classList.remove('hidden')
  }
}

export const clearDraftValue = () => {
  const sendDraftInputElm = document.querySelector('#sendDraftInput')
  sendDraftInputElm.value = ''
}

export const _createModalElm = () => {
  const modalTemplateElm = document.querySelector('#modalTemplate')
  const modalElm = modalTemplateElm.cloneNode(true)
  modalElm.id = ''

  const modalTitleElm = modalElm.querySelector('[data-id="modalTitle"]')
  modalTitleElm.innerText = 'ChatGPTへの質問内容'

  const labelDiv = document.createElement('div')
  labelDiv.innerText = 'エラーが発生しました。'
  modalElm.querySelector('[data-id="modalContent"]').appendChild(labelDiv)

  const setContent = ({ modalElmHtml }) => {
    modalElm.querySelector('[data-id="modalContent"]').innerHTML = modalElmHtml
  }

  return { modalElm, setContent }
}

export const getShowModalAndSetOnClick = ({
  showModalCustom, parseModalElmToPrompt
}) => {
  return async ({ modalElmHtml, onClickSendPromptButton }) => {
    const { modalElm, setContent } = _createModalElm()
    setContent({ modalElmHtml })
    let prompt = ''
    const cb = () => {
      prompt = parseModalElmToPrompt({ modalElm })
    }
    const isClickConfirm = await showModalCustom(modalElm, cb)
    if (!isClickConfirm) {
      console.log({ debug: 'キャンセル', isClickConfirm })
      return
    }
    console.log({ debug: 'prompt送信', isClickConfirm })

    onClickSendPromptButton({ prompt })
  }
}


/* from xdevkit*/
const _closeModal = () => {
  applyElmList('[data-id="modal"], #modalBackground', (elm) => {
    elm.classList.add('hidden')
  })
}

const applyElmList = (query, f, parent = document) => {
  Object.values(parent.querySelectorAll(query)).forEach((elm) => {
    f(elm)
  })
}

export const showModalCustom = (modalElm, cb, cancelButtonIsVisible = false) => {
  return new Promise((resolve) => {
    if (modalElm.id === 'modalTemplate') {
      modalElm.id = ''
    }
    document.body.appendChild(modalElm)
    _closeModal()

    setTimeout(() => {
      applyElmList('[data-id="modalClose"], [data-id="modalCancelButton"]', (elm) => {
        elm.onclick = () => {
          _closeModal()
          return resolve(false)
        }
      }, document)

      if (cancelButtonIsVisible) {
        modalElm.querySelector('[data-id="modalCancelButton"]').classList.remove('hidden')
      } else {
        modalElm.querySelector('[data-id="modalCancelButton"]').classList.add('hidden')
      }
      modalElm.querySelector('[data-id="modalConfirmButton"]').onclick = () => {
        cb()
        _closeModal()
        return resolve(true)
      }
      modalElm.classList.remove('hidden')
      document.querySelector('#modalBackground').classList.remove('hidden')
      modalElm.querySelector('[data-id="modalContent"]').scrollTop = 0
      modalElm.querySelector('[data-id="modalCard"]').onclick = (e) => {
        e.stopPropagation()
      }
      modalElm.onclick = (e) => {
        e.stopPropagation()
        _closeModal()
        return resolve(false)
      }
    }, 100)
  })
}


