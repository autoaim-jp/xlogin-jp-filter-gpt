/* mypage/core.js */

let requestIdList = {}

export const appendChatList = ({
  prompt, chatList, promptChatId, responseChatId, requestId,
}) => {
  const newChatList = chatList
  newChatList[promptChatId] = { isMine: true, text: prompt }
  newChatList[responseChatId] = { isMine: false, requestId, waiting: true }

  return newChatList
}


let lastChatListStr = null
export const convertChatList = ({ chatListResult }) => {
  console.log({ chatListResult })
  if (!chatListResult || !chatListResult.result) {
    return null
  }
  const { chatList } = chatListResult.result


  const simpleChatList = { isUpdated: false, chatList: [] }

  if (!chatList || lastChatListStr === JSON.stringify(chatList)) {
    return simpleChatList
  }
  console.log('chatList updated')
  lastChatListStr = JSON.stringify(chatList)
  simpleChatList.isUpdated = true
  requestIdList = {}

  Object.entries(chatList).forEach(([chatId, chat]) => {
    chat.chatId = chatId
    simpleChatList.chatList.push(chat)
    if (chat.requestId && chat.waiting) {
      requestIdList[chat.requestId] = true
    }
  })

  return simpleChatList
}

export const lookupResponse = async ({
  fetchResponseList, fetchChatList, updateChatList, loadChatHistory,
}) => {
  const requestIdListStr = Object.keys(requestIdList).join(',')
  if (requestIdListStr.length === 0) {
    return
  }
  const responseListResult = await fetchResponseList({ requestIdListStr })
  console.log({ responseListResult })
  if (!responseListResult || !responseListResult.result) {
    return
  }

  const updateList = {}
  Object.entries(responseListResult.result).forEach(([requestId, responseObj]) => {
    if (responseObj.waiting === true) {
      return
    }

    if (!responseObj.result || !responseObj.result.response) {
      return
    }
    updateList[requestId] = responseObj.result.response
  })

  if (Object.keys(updateList).length === 0) {
    return
  }

  const chatListResult = await fetchChatList()
  console.log({ updateList, chatListResult })
  if (!chatListResult || !chatListResult.result) {
    return
  }
  const { chatList } = chatListResult.result
  Object.entries(chatList).forEach(([chatId, chat]) => {
    if (updateList[chat.requestId]) {
      chatList[chatId].waiting = false
      chatList[chatId].text = updateList[chat.requestId]
    }
  })

  const updateChatListResult = await updateChatList({ newChatList: chatList })
  console.log({ updateChatListResult })

  await loadChatHistory()
}

export const convertPromptListToHtml = ({ sendDraftResult }) => {
  const { promptWordList } = sendDraftResult.result

  const modalElmHtmlList = []
  promptWordList.forEach((wordList) => {
    console.log({ wordList })
    if (wordList.length === 1) {
      if (wordList[0] === '\n') {
        /* br is newline */
        modalElmHtmlList.push('<br />')
      } else {
        /* p has plain text */
        modalElmHtmlList.push(`<p class='inline'>${wordList[0]}</p>`)
      }
      return
    }

    /* select has multiple options */
    modalElmHtmlList.push('<select class=\'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500\'>')
    wordList.forEach((wordCandidate, i) => {
      if (i === 0) {
        modalElmHtmlList.push(`<option value=${wordCandidate} selected>${wordCandidate}</option>`)
      } else {
        modalElmHtmlList.push(`<option value=${wordCandidate}>${wordCandidate}</option>`)
      }
    })
    modalElmHtmlList.push('</select>')
  })

  const modalElmHtml = `<div class='max-h-72 overflow-y-scroll' data-id='modalScrollDiv'>${modalElmHtmlList.join('\n')}</div>`
  return modalElmHtml
}

export const parseModalElmToPrompt = ({ modalElm }) => {
  const elmList = modalElm.querySelector('[data-id="modalScrollDiv"]').children
  const promptList = []

  Object.values(elmList).forEach((elm) => {
    /* br is newline */
    if (elm.tagName === 'BR') {
      promptList.push('\n')
      return
    }

    /* p has plain text */
    if (elm.tagName === 'P') {
      promptList.push(elm.innerText)
      return
    }

    /* select has multiple options */
    promptList.push(elm.selectedOptions[0].value)
  })

  const prompt = promptList.join('')
  return prompt
}

export default {}

