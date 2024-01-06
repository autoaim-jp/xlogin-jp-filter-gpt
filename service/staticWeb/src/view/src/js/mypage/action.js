export const getOnSubmitSendDraftForm = ({
  sendDraft, convertPromptListToHtml, showModalAndSetOnClick, onClickSendPromptButton
}) => {
  return async () => {
    const sendDraftResult = await sendDraft()
    console.log({ sendDraftResult })

    const modalElmHtml = convertPromptListToHtml({ sendDraftResult })

    console.log({ modalElmHtml })

    showModalAndSetOnClick({ modalElmHtml, onClickSendPromptButton })
  }
}

export const getOnClickSendPromptButton = ({
  sendPrompt, clearDraftValue, fetchChatList, appendChatList, updateChatList, loadChatHistory,
}) => {
  return async ({ prompt }) => {
    const sendPromptResult = await sendPrompt({ prompt })
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

    clearDraftValue()

    loadChatHistory()
  }
}

export default {}

