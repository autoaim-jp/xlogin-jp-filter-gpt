/* /index/app.js */
import setting from '../_setting/index.js'

import * as output from './output.js'
import * as action from './action.js'
import * as lib from '../_lib/index.js'

const asocial = {}
asocial.output = output
asocial.action = action
asocial.lib = lib
asocial.setting = setting
/* a is an alias of asocial */
const a = asocial

const main = async () => {
  a.lib.xdevkit.output.switchLoading(true)
  a.lib.common.output.setOnClickNavManu()
  a.lib.monkeyPatch()
  a.app.loadXloginButton()
  setTimeout(() => {
    a.lib.xdevkit.output.switchLoading(false)
  }, 300)
}

const loadXloginButton = async () => {
  const splitPermissionListResult = await a.lib.common.input.fetchSplitPermissionList(a.setting.browserServerSetting.getValue('apiEndpoint'))
  a.lib.xdevkit.output.reloadXloginLoginBtn(splitPermissionListResult?.result?.clientId)
}

a.app = {
  main,
  loadXloginButton,
}

a.app.main()

