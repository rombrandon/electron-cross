import {ipcMain} from 'electron'
import cross from '../cross'

export default class {
  constructor (router) {
    this.router = router
  }
  initialize () {
    ipcMain.on(cross.RENDERER_ROUTER_PUSH, (event, option) => {
      const defined = this.router.findInApps(option.name)
      const route = this.router.push(option)
      if (defined) {
        event.sender.send(cross.MAIN_ROUTER_CONNECT, route.id)
      } else {
        route.app.webContents.on('did-finish-load', () => {
          event.sender.send(cross.MAIN_ROUTER_CONNECT, route.id)
        })
      }
    })
    ipcMain.on(cross.RENDERER_ROUTER_CLOSE, (event, option) => {
      const defined = this.router.findInApps(option.name)
      defined && defined.app.close()
    })
  }
}
