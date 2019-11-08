import {remote} from 'electron'
import Publisher from './Publisher'
import Subscriber from './Subscriber'

export default class {
  constructor (options) {
    this.process = 'renderer'
    this.routes = options.routes || []
    this.publisher = new Publisher(this)
    this.subscriber = new Subscriber(this)
    this.listener = null
  }
  // 打开/激活窗口
  push (option) {
    return new Promise((resolve, reject) => {
      // 监听一次连接事件
      this.subscriber.onceConnect((event, id) => {
        resolve(id)
      })
      // 发送请求连接
      this.publisher.dispatchPush(option)
    })
  }
  // 向指定窗口发送消息
  send (option, message) {
    return new Promise((resolve, reject) => {
      // 监听一次连接事件
      this.subscriber.onceConnect((event, id) => {
        const key = Math.random().toString()
        // 监听消息返回事件
        this.subscriber.bindMessageResponse(key, (event, message) => {
          resolve(message)
        })
        // 发送消息请求
        this.publisher.dispatchMessageRequest(id, key, message)
      })
      // 发送请求连接
      this.publisher.dispatchPush(option)
    })
  }
  // 监听窗口消息
  on (handler) {
    // 监听消息返回事件
    return this.subscriber.bindMessageRequest((event, key, message, id) => {
      const response = handler(message)
      // 发送消息返回
      this.publisher.dispatchMessageResponse(id, key, response)
    })
  }
  // 解绑监听
  off (listener) {
    listener && this.subscriber.removeMessageRequest(listener)
  }
  // 关闭窗口
  close (option) {
    if (option && option.name) {
      this.publisher.dispatchClose(option)
    } else {
      remote.getCurrentWindow().close()
    }
  }
  beforeEach () {}
  afterEach () {}
}
