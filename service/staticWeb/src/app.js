import fs from 'fs'
import { Readable } from 'stream'
import axios from 'axios'
import crypto from 'crypto'
import https from 'https'
import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import dotenv from 'dotenv'
import multer from 'multer'
import FormData from 'form-data'
import winston from 'winston'

import xdevkit from './xdevkit-auth-router/src/app.js'
import setting from './setting/index.js'
import output from './output.js'
import core from './core.js'
import input from './input.js'
import action from './action.js'
import lib from './lib.js'


const asocial = {
  setting, output, core, input, action, lib,
}

const a = asocial

const _getOtherRouter = () => {
  const expressRouter = express.Router()
  if (setting.getValue('env.SERVER_ORIGIN').indexOf('https') >= 0) {
    expressRouter.use(helmet())
  }
  expressRouter.use(bodyParser.urlencoded({ extended: true }))
  expressRouter.use(bodyParser.json())

  expressRouter.use(express.static(setting.getValue('server.PUBLIC_BUILD_DIR'), { index: 'index.html', extensions: ['html'] }))
  expressRouter.use(express.static(setting.getValue('server.PUBLIC_STATIC_DIR'), { index: 'index.html', extensions: ['html'] }))
  return expressRouter
}

const _getActionRouter = () => {
  const expressRouter = express.Router()

  const timerAddHandler = a.action.getHandlerTimerAdd(argNamed({
    core: [a.core.handleTimerAdd, a.core.createResponse],
  }))
  expressRouter.post(`${setting.browserServerSetting.getValue('apiEndpoint')}/timer/add`, timerAddHandler)

  const notificationOpenHandler = a.action.getHandlerNotificationOpen(argNamed({
    core: [a.core.handleNotificationOpen, a.core.createResponse],
  }))
  expressRouter.post(`${setting.browserServerSetting.getValue('apiEndpoint')}/notification/open`, notificationOpenHandler)

  const notificationListHandler = a.action.getHandlerNotificationList(argNamed({
    core: [a.core.handleInvalidSession, a.core.handleNotificationList, a.core.createResponse],
  }))
  expressRouter.get(`${setting.browserServerSetting.getValue('apiEndpoint')}/notification/list`, notificationListHandler)

  const messageSaveHandler = a.action.getHandlerMessageSave(argNamed({
    core: [a.core.handleMessageSave, a.core.createResponse],
  }))
  expressRouter.post(`${setting.browserServerSetting.getValue('apiEndpoint')}/message/save`, messageSaveHandler)

  const messageContentHandler = a.action.getHandlerMessageContent(argNamed({
    core: [a.core.handleMessageContent, a.core.createResponse],
  }))
  expressRouter.get(`${setting.browserServerSetting.getValue('apiEndpoint')}/message/content`, messageContentHandler)

  const messageDeleteHandler = a.action.getHandlerMessageDelete(argNamed({
    core: [a.core.handleMessageDelete, a.core.createResponse],
  }))
  expressRouter.post(`${setting.browserServerSetting.getValue('apiEndpoint')}/message/delete`, messageDeleteHandler)

  const updateBackupEmailAddressHandler = a.action.getHandlerUpdateBackupEmailAddress(argNamed({
    core: [a.core.handleUpdateBackupEmailAddress, a.core.createResponse],
  }))
  expressRouter.post(`${setting.browserServerSetting.getValue('apiEndpoint')}/backupEmailAddress/save`, updateBackupEmailAddressHandler)

  const splitPermissionListHandler = a.action.getHandlerSplitPermissionList(argNamed({
    core: [a.core.handleInvalidSession, a.core.handleSplitPermissionList, a.core.createResponse],
  }))
  expressRouter.get(`${setting.browserServerSetting.getValue('apiEndpoint')}/session/splitPermissionList`, splitPermissionListHandler)

  const uploadFileHandler = a.action.getHandlerUploadFile(argNamed({
    core: [a.core.handleUploadFile, a.core.createResponse],
    mod: [multer, FormData, Readable],
  }))
  expressRouter.post(`${setting.browserServerSetting.getValue('apiEndpoint')}/form/save`, uploadFileHandler)

  const fileListHandler = a.action.getHandlerFileList(argNamed({
    core: [a.core.handleFileList, a.core.createResponse],
  }))
  expressRouter.get(`${setting.browserServerSetting.getValue('apiEndpoint')}/file/list`, fileListHandler)

  const fileContentHandler = a.action.getHandlerFileContent(argNamed({
    core: [a.core.handleFileContent],
  }))
  expressRouter.get(`${setting.browserServerSetting.getValue('apiEndpoint')}/file/content`, fileContentHandler)


  return expressRouter
}

const _startServer = (expressApp) => {
  if (setting.getValue('env.SERVER_ORIGIN').indexOf('https') >= 0) {
    const tlsConfig = {
      key: fs.readFileSync(setting.getValue('env.TLS_KEY_PATH')),
      cert: fs.readFileSync(setting.getValue('env.TLS_CERT_PATH')),
    }
    const server = https.createServer(tlsConfig, expressApp)
    server.listen(setting.getValue('env.SERVER_PORT'), () => {
      logger.info(`${setting.getValue('env.CLIENT_ID')} listen to port: ${setting.getValue('env.SERVER_PORT')}, origin: ${setting.getValue('env.SERVER_ORIGIN')}`)
    })
  } else {
    expressApp.listen(setting.getValue('env.SERVER_PORT'), () => {
      logger.info(`${setting.getValue('env.CLIENT_ID')} listen to port: ${setting.getValue('env.SERVER_PORT')}, origin: ${setting.getValue('env.SERVER_ORIGIN')}`)
    })
  }
}

const main = () => {
  dotenv.config()
  lib.init(axios, http, https, crypto, winston)
  setting.init(process.env)
  core.init(setting, output, input, lib)
  a.lib.monkeyPatch({ SERVICE_NAME: a.setting.getValue('env.SERVICE_NAME') })


  const expressApp = express()
  expressApp.use(_getOtherRouter())
  expressApp.use(xdevkit.getRouter({ browserServerSetting: setting.browserServerSetting, xdevkitSetting: setting.xdevkitSetting }))
  expressApp.use(_getActionRouter())

  _startServer(expressApp)
}

main()

