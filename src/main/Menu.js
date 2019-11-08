import {Menu} from 'electron'

export default class {
  constructor (options) {
    this.base = options
  }
  initialize (options) {
    const template = options || this.base
    if (template) {
      return this.create(template)
    } else if (template !== false) {
      return this.destroy()
    }
  }
  // 创建菜单
  create (template) {
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
  }
  // 隐藏菜单
  destroy () {
    // darwin表示macOS，针对macOS的设置
    if (process.platform === 'darwin') {
      const template = [{label: 'menu', submenu: [{role: 'about'}, {role: 'quit'}]}]
      let menu = Menu.buildFromTemplate(template)
      Menu.setApplicationMenu(menu)
    } else {
      // windows及linux系统
      Menu.setApplicationMenu(null)
    }
  }
}
