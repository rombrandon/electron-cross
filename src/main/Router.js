import {BrowserWindow} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'
import Subscriber from './Subscriber'
import Menu from './Menu'

export default class {
  constructor (options = {}) {
    this.process = 'main'
    this.apps = []
    const {protocol, base, menu, routes, root,...arg} = options
    // app协议
    this.protocol = protocol
    // 路由地址
    this.base = base || ''
    // 菜单实例
    this.menu = new Menu(menu)
    // 路由配置
    this.routes = routes || []
    // 首屏
    this.root = root || this.routes[0].name
    // 配置项
    this.options = {...arg}
    // 初始化监听器
    this.subscriber = new Subscriber(this)
    this.subscriber.initialize()
  }
  /**
   * Public
   * **/
  // 初始化首页 - 返回窗口实例
  init () {
    return this.push({name: this.root})
  }
  // 打开/激活窗口 - 返回路由对象
  // option = {name: 'index', config: {}, focus: false}
  push (option) {
    const route = this.findInApps(option.name) || this.createRoute(option.name, option.config)
    if (option.focus !== false) {
      route.app.focus()
    }
    return route
  }
  // 创建页面前回调
  beforeEach (callback) {
    if (callback instanceof Function) {
      this.beforeCallback = callback
    }
  }
  // 创建页面后回调
  afterEach (callback) {
    if (callback instanceof Function) {
      this.afterCallback = callback
    }
  }
  /**
   * Private
   * **/
  // 创建路由
  createRoute (name, config = {}) {
    const app = this.createApp(name, config)
    app.on('closed', () => {
      this.apps = this.apps.filter(route => route.name !== name)
    })
    const route = {app, name, id: app.id}
    this.apps.push(route)
    return route
  }
  // 新开窗口
  createApp (name, config = {}) {
    const route = this.findInRoutes(name)
    this.beforeCallback(this)
    const app = new BrowserWindow(Object.assign({
      webPreferences: {
        nodeIntegration: true
      }
    }, this.options, route.config, config))
    if (this.protocol) {
      createProtocol(this.protocol)
    }
    // 加载页面
    if (route.url) {
      app.loadURL(this.base + route.url)
    } else if (route.file) {
      app.loadFile(this.base + route.file)
    }
    // 加载菜单
    this.menu.initialize(config.menu)
    this.afterCallback(app, route)
    return app
  }
  // 配置中查找窗口
  findInRoutes (name) {
    const route = this.routes.find(route => route.name === name)
    if (!route) throw new Error(`${name}路由不存在`)
    return route
  }
  // 窗口集合中查找窗口
  findInApps (name) {
    return this.apps.find(route => route.name === name)
  }
  beforeCallback () {}
  afterCallback () {}
}
