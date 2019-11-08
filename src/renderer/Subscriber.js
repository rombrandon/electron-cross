import {ipcRenderer} from 'electron'
import cross from '../cross'

export default class {
  constructor (router) {
    this.router = router
  }
  // 监听一次连接事件
  onceConnect (callback) {
    ipcRenderer.once(cross.MAIN_ROUTER_CONNECT, (...arg) => callback(...arg))
  }
  // 监听消息请求事件
  bindMessageRequest (callback) {
    const listener = (...arg) => callback(...arg)
    ipcRenderer.on(cross.MESSAGE_CONNECT_REQUEST, listener)
    return listener
  }
  // 取消监听消息请求事件
  removeMessageRequest (listener) {
    ipcRenderer.removeListener(cross.MESSAGE_CONNECT_REQUEST, listener)
  }
  // 监听消息返回事件
  bindMessageResponse (key, callback) {
    const responseHandler = (event, keys, message) => {
      // 消息解绑
      if (key === keys) {
        ipcRenderer.removeListener(cross.MESSAGE_CONNECT_RESPONSE, responseHandler)
        callback(event, message)
      }
    }
    ipcRenderer.on(cross.MESSAGE_CONNECT_RESPONSE, responseHandler)
  }
}
