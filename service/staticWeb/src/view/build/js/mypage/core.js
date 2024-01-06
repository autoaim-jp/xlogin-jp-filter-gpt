/* mypage/core.js */

let requestIdList = {}

export const appendChatList = ({
  getPromptValue, chatList, promptChatId, responseChatId, requestId,
}) => {
  const prompt = getPromptValue()

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

export default {}

