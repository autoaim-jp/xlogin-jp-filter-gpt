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

const loadProfile = async () => {
  const userInfoResult = await a.input.fetchUserProfile(argNamed({
    browserServerSetting: a.setting.browserServerSetting.getList('apiEndpoint'),
    lib: [a.lib.common.input.getRequest],
  }))
  a.lib.redirect(userInfoResult)
  a.output.showUserProfile(argNamed({
    lib: [a.lib.xdevkit.output.applyElmList],
    other: { userInfoResult },
  }))
  return userInfoResult
}

const loadTimerBtn = async () => {
  const addTimer = a.output.getAddTimer(argNamed({
    browserServerSetting: a.setting.browserServerSetting.getList('apiEndpoint'),
    lib: [a.lib.common.output.postRequest],
  }))

  const onClickAddTimerButton = a.action.getOnClickAddTimerButton(argNamed({
    output: { addTimer },
  }))
  a.output.setOnClickAddTimerButton(argNamed({
    onClick: { onClickAddTimerButton },
  }))
}

const showNotification = () => {
  setInterval(() => {
    a.lib.common.output.showNotification(a.setting.browserServerSetting.getValue('apiEndpoint'), a.lib.xdevkit.output.showModal, a.lib.common.input.getRequest)
  }, 30 * 1000)
}

const loadMessageContent = async () => {
  const messageResult = await a.input.fetchMessage(argNamed({
    browserServerSetting: a.setting.browserServerSetting.getList('apiEndpoint'),
    lib: [a.lib.common.input.getRequest],
  }))

  a.output.showMessage(argNamed({
    param: { messageResult },
  }))
}

const loadMessageBtn = () => {
  const saveMessage = a.output.getSaveMessage(argNamed({
    browserServerSetting: a.setting.browserServerSetting.getList('apiEndpoint'),
    lib: [a.lib.common.output.postRequest],
  }))
  const onClickSaveMessageButton = a.action.getOnClickSaveMessageButton(argNamed({
    output: { saveMessage },
  }))
  a.output.setOnClickSaveMessageButton(argNamed({
    onClick: { onClickSaveMessageButton },
  }))

  const deleteMessage = a.output.getDeleteMessage(argNamed({
    browserServerSetting: a.setting.browserServerSetting.getList('apiEndpoint'),
    lib: [a.lib.common.output.postRequest],
  }))
  const onClickDeleteMessageButton = a.action.getOnClickDeleteMessageButton(argNamed({
    output: { deleteMessage },
  }))
  a.output.setOnClickDeleteMessageButton(argNamed({
    onClick: { onClickDeleteMessageButton },
  }))
}

const loadUploadForm = () => {
  const uploadFile = a.output.getUploadFile(argNamed({
    browserServerSetting: a.setting.browserServerSetting.getList('apiEndpoint'),
    lib: [a.lib.common.output.postFormRequest],
  }))

  const onSubmitUploadForm = a.action.getOnSubmitUploadForm(argNamed({
    output: { uploadFile },
  }))

  a.output.setOnSubmitUploadForm(argNamed({
    onSubmit: { onSubmitUploadForm },
  }))


  const fetchUploadedFileList = a.input.getFetchUploadedFileList(argNamed({
    browserServerSetting: a.setting.browserServerSetting.getList('apiEndpoint'),
    lib: [a.lib.common.input.getRequest],
  }))

  const loadUploadedImg = a.output.getLoadUploadedImg(argNamed({
    browserServerSetting: a.setting.browserServerSetting.getList('apiEndpoint'),
  }))

  a.core.showUploadedImg(argNamed({
    input: { fetchUploadedFileList },
    output: { loadUploadedImg },
  }))
}

const loadPermission = async () => {
  const splitPermissionListResult = await a.lib.common.input.fetchSplitPermissionList(a.setting.browserServerSetting.getValue('apiEndpoint'))
  a.output.showEditor(argNamed({
    param: { splitPermissionListResult },
  }))

  a.output.showBackupEmailAddressForm(argNamed({
    param: { splitPermissionListResult },
  }))

  a.output.showUploadForm(argNamed({
    param: { splitPermissionListResult },
  }))

  a.lib.xdevkit.output.reloadXloginLoginBtn(splitPermissionListResult?.result?.clientId)
}

const loadTabBtn = async () => {
  const tabList = {
    editorTabContainer: 'エディタ', timerTabContainer: 'タイマー', backupEmailAddressFormTabContainer: 'バックアップメールアドレス', uploadTabContainer: 'プロフィール画像',
  }
  const activeTabContainerId = Object.keys(tabList)[0]

  a.output.addTabMenuContainer(argNamed({
    lib: [a.lib.xdevkit.output.createTabMenuContainer, a.lib.xdevkit.output.showTabButton],
    param: { tabList, activeTabContainerId },
  }))
}

const loadBackupEmailAddressForm = async ({ userInfoResult }) => {
  const backupEmailAddress = a.input.getBackupEmailAddress(argNamed({
    param: { userInfoResult },
  }))
  a.output.showBackupEmailAddress(argNamed({
    param: { backupEmailAddress },
  }))

  const saveBackupEmailAddress = a.output.getSaveBackupEmailAddress(argNamed({
    browserServerSetting: a.setting.browserServerSetting.getList('apiEndpoint'),
    lib: [a.lib.common.output.postRequest],
  }))
  const onSubmitBackupEmailAddress = a.action.getOnSubmitBackupEmailAddress(argNamed({
    param: { saveBackupEmailAddress },
  }))
  a.output.setOnSubmitBackupEmailAddress(argNamed({
    param: { onSubmitBackupEmailAddress },
  }))
}

const main = async () => {
  a.lib.xdevkit.output.switchLoading(true)
  a.lib.common.output.setOnClickNavManu()
  a.lib.monkeyPatch()

  const userInfoResult = await a.app.loadProfile()
  await a.app.loadBackupEmailAddressForm({ userInfoResult })
  a.app.loadTimerBtn()
  a.app.loadMessageContent()
  a.app.loadMessageBtn()
  a.app.loadUploadForm()
  a.app.loadTabBtn()

  a.app.showNotification()
  a.app.loadPermission()

  setTimeout(() => {
    a.lib.xdevkit.output.switchLoading(false)
  }, 300)
}

a.app = {
  main,
  loadProfile,
  loadTimerBtn,
  showNotification,
  loadMessageContent,
  loadMessageBtn,
  loadUploadForm,
  loadPermission,
  loadTabBtn,
  loadBackupEmailAddressForm,
}

a.app.main()

