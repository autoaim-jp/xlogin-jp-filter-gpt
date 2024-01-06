export const getOnSubmitSendPromptForm = ({
  sendPrompt, getPromptValue, clearPromptValue, fetchChatList, appendChatList, updateChatList, loadChatHistory,
}) => {
  return async () => {
    const sendPromptResult = await sendPrompt()
    console.log({ sendPromptResult })
    const { requestId, promptChatId, responseChatId } = sendPromptResult.result

    const chatListResult = await fetchChatList()
    console.log({ chatListResult })
    const { chatList } = chatListResult.result

    const newChatList = appendChatList({
      getPromptValue, chatList, promptChatId, responseChatId, requestId,
    })

    const updateChatListResult = await updateChatList({ newChatList })
    console.log({ updateChatListResult })

    clearPromptValue()

    loadChatHistory()
  }
}

export default {}

