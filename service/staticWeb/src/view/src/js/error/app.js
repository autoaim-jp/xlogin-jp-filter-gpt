/* error/app.js */
import setting from '../_setting/index.js'
import * as lib from '../_lib/index.js'

import * as output from './output.js'

const asocial = {}
asocial.setting = setting
asocial.lib = lib
asocial.output = output

/* a is an alias of asocial */
const a = asocial

const loadErrorMessage = () => {
  a.output.showErrorModal(argNamed({
    lib: [a.lib.xdevkit.lib.getSearchQuery, a.lib.xdevkit.output.getErrorModalElmAndSetter, a.lib.xdevkit.output.showModal],
    browserServerSetting: a.setting.browserServerSetting.getList('labelList'),
  }))
}

const main = async () => {
  a.lib.xdevkit.output.switchLoading(true)
  a.lib.common.output.setOnClickNavManu()
  a.lib.monkeyPatch()

  a.app.loadErrorMessage()

  setTimeout(() => {
    a.lib.xdevkit.output.switchLoading(false)
  }, 300)
}

a.app = {
  main,
  loadErrorMessage,
}

a.app.main()

