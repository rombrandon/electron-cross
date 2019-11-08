import {remote, ipcRenderer} from 'electron'
import cross from '../cross'

export default class {
  constructor (router) {
    this.router = router
  }
  // 发送窗口请求
  dispatchPush (option) {
    ipcRenderer.send(cross.RENDERER_ROUTER_PUSH, option)
  }
  // 发送窗口关闭请求
  dispatchClose (option) {
    ipcRenderer.send(cross.RENDERER_ROUTER_CLOSE, option)
  }
  // 发送消息请求
  dispatchMessageRequest (id, key, message) {
    const app = remote.BrowserWindow.fromId(id)
    app.webContents.send(cross.MESSAGE_CONNECT_REQUEST, key, message, remote.getCurrentWindow().id)
  }
  // 发送消息返回
  dispatchMessageResponse (id, key, response) {
    const app = remote.BrowserWindow.fromId(id)
    app.webContents.send(cross.MESSAGE_CONNECT_RESPONSE, key, response)
  }
}
