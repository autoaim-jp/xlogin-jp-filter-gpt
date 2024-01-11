/* mypage/app.js */
import setting from '../_setting/index.js'
import * as lib from '../_lib/index.js'

import * as core from './core.js'
import * as input from './input.js'
import * as action from './action.js'
import * as output from './output.js'

const asocial = {}
asocial.setting = setting
asocial.output = output
asocial.core = core
asocial.input = input
asocial.action = action
asocial.lib = lib

/* a is an alias of asocial */
const a = asocial

const showNotification = () => {
  setInterval(() => {
    a.lib.common.output.showNotification(a.setting.browserServerSetting.getValue('apiEndpoint'), a.lib.xdevkit.output.showModal, a.lib.common.input.getRequest)
  }, 30 * 1000)
}

const _getOnClickSendPromptButton = () => {
  const sendPrompt = a.output.getSendPrompt(argNamed({
    browserServerSetting: a.setting.browserServerSetting.getList('apiEndpoint'),
    input: [a.input.getPromptValue],
    lib: [a.lib.common.output.postRequest],
  }))

  const updateChatList = a.output.getUpdateChatList(argNamed({
    browserServerSetting: a.setting.browserServerSetting.getList('apiEndpoint'),
    lib: [a.lib.common.output.postRequest],
  }))

  const fetchChatList = a.input.getFetchChatList(argNamed({
    browserServerSetting: a.setting.browserServerSetting.getList('apiEndpoint'),
    lib: [a.lib.common.input.getRequest],
  }))

  const onClickSendPromptButton = a.action.getOnClickSendPromptButton(argNamed({
    input: { fetchChatList },
    output: [a.output.clearDraftValue],
    output2: { sendPrompt, updateChatList },
    core: [a.core.appendChatList],
    app: [a.app.loadChatHistory],
  }))

  return onClickSendPromptButton
}

const loadDraftForm = () => {
  const sendDraft = a.output.getSendDraft(argNamed({
    browserServerSetting: a.setting.browserServerSetting.getList('apiEndpoint'),
    input: [a.input.getDraftValue],
    lib: [a.lib.common.output.postRequest],
  }))

  const showModalAndSetOnClick = a.output.getShowModalAndSetOnClick(argNamed({
    lib: [a.lib.xdevkit.output.showModal],
    core: [a.core.parseModalElmToPrompt],
  }))

  const onClickSendPromptButton = _getOnClickSendPromptButton()

  const onSubmitSendDraftForm = a.action.getOnSubmitSendDraftForm(argNamed({
    output: { sendDraft },
    output2: { showModalAndSetOnClick },
    core: [ a.core.convertPromptListToHtml ],
    param: { onClickSendPromptButton },
  }))

  a.output.setOnSubmitSendDraftForm(argNamed({
    onSubmit: { onSubmitSendDraftForm },
  }))

}

const loadChatHistory = async () => {
  const fetchChatList = a.input.getFetchChatList(argNamed({
    browserServerSetting: a.setting.browserServerSetting.getList('apiEndpoint'),
    lib: [a.lib.common.input.getRequest],
  }))

  const chatListResult = await fetchChatList()

  const simpleChatList = a.core.convertChatList(argNamed({
    param: { chatListResult },
  }))

  a.output.showChatList(argNamed({
    param: { simpleChatList },
  }))
}

const loadPermission = async () => {
  const splitPermissionListResult = await a.lib.common.input.fetchSplitPermissionList(a.setting.browserServerSetting.getValue('apiEndpoint'))
  a.output.showPromptForm(argNamed({
    param: { splitPermissionListResult },
  }))
  a.output.showChatHistory(argNamed({
    param: { splitPermissionListResult },
  }))

  a.lib.xdevkit.output.reloadXloginLoginBtn(splitPermissionListResult?.result?.clientId)
}

const startResponseLoader = async () => {
  const fetchResponseList = a.input.getFetchResponseList(argNamed({
    browserServerSetting: a.setting.browserServerSetting.getList('apiEndpoint'),
    lib: [a.lib.common.input.getRequest],
  }))

  const fetchChatList = a.input.getFetchChatList(argNamed({
    browserServerSetting: a.setting.browserServerSetting.getList('apiEndpoint'),
    lib: [a.lib.common.input.getRequest],
  }))

  const updateChatList = a.output.getUpdateChatList(argNamed({
    browserServerSetting: a.setting.browserServerSetting.getList('apiEndpoint'),
    lib: [a.lib.common.output.postRequest],
  }))

  await a.core.lookupResponse(argNamed({
    param: { fetchResponseList, fetchChatList, updateChatList },
    app: [a.app.loadChatHistory],
  }))
  setInterval(async () => {
    await a.core.lookupResponse(argNamed({
      param: { fetchResponseList, fetchChatList, updateChatList },
      app: { loadChatHistory },
    }))
  }, 5 * 1000)
}

const main = async () => {
  a.lib.xdevkit.output.switchLoading(true)
  a.lib.common.output.setOnClickNavManu()
  a.lib.monkeyPatch()

  console.log('loadDraftForm')
  a.app.loadDraftForm()

  console.log('loadPermission')
  a.app.loadPermission()
  await a.app.loadChatHistory()

  console.log('startResponseLoader')
  a.app.startResponseLoader()

  setTimeout(() => {
    a.lib.xdevkit.output.switchLoading(false)
  }, 300)
}

a.app = {
  main,
  showNotification,
  loadDraftForm,
  loadChatHistory,

  startResponseLoader,

  loadPermission,
}

a.app.main()

