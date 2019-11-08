# electron-cross

Electron路由管理，跨路由进程间的通信

## 安装
```
npm i electron-cross
```

## 快速上手

### 实例化路由

- 实例化路由，所有方法由该实例提供。
- 主进程/渲染进程均可调用。

```
import Router from 'electron-cross'

export default new Router({
  routes: [
    {
      name: 'index',
      path: 'index.html'
    },
    {
      name: 'home',
      path: 'home.html'
    }
  ]
})
```

### 加载首页

主进程中调用`init()`方法，返回的`{app}`为窗口实例

```
import router from './router.js'

const app = router.init().app

```

### 加载更多进程

主进程/渲染进程均可调用`push(options)`方法

```
import router from './router.js'

router.push({name: 'home'})

```

### 进程通信

### 触发

渲染进程可调用`send(options, message)`方法，将自动打开进程并传递消息

```
import router from './router.js'

router.send({name: 'home'}, {data: 'message'}).then(data => {
    // 消息已被成功接收
})

```

### 监听

渲染进程调用`on(callback)`方法监听消息，返回`listener`

```
import router from './router.js'

const listener = router.on(message => {
    // 接收消息
})

```

### 解绑

渲染进程调用`off(listener)`方法解绑监听

```
import router from './router.js'

router.off(listener)

```

## API

### new Router(options)
options 参数 Object
|名称|类型|默认值|描述|
|-|-|-|-|
|base|String|WEBPACK_DEV_SERVER_URL或'app://./'|路由path的前缀|
|menu|Array|空|页面菜单。如果值为false，则隐藏菜单|
|root|String|routes[0].name|首页|
|routes|Array|必填项|路由配置项|
|routes[].name|String|必填项|路由名称|
|routes[].path|String|必填项|路由URL|
|routes[].config|Object|null|BrowserWindow参数|
|其他|-|-|默认BrowserWindow参数|

### 实例方法

#### beforeEach(callback)
主进程可用

`new BrowserWindow` 前回调 `callback(router)`

#### afterEach(callback)
主进程可用

`new BrowserWindow` 后回调 `callback(app, route)`

#### init()
主进程可用

初始化首页 - 返回`route`对象

route 返回值 Object
|名称|类型|描述|
|-|-|-|
|app|-|窗口实例|
|id|Number|窗口实例Id|
|name|String|路由名称|

#### push(option)
主进程/渲染进程可用

加载路由页面
主进程返回`route`对象
渲染进程返回Promise，返回窗口实例id

option 参数 Object
|名称|类型|描述|
|-|-|-|
|name|String|路由名称|
|config|Object|BrowserWindow参数|
|focus|Boolean|获取焦点，默认true|

#### send(option, message)
渲染进程可用

向指定窗口发送消息，返回Promise，返回接收消息中的return

#### on(callback)
渲染进程可用

监听窗口消息，返回listener
callback中的return将传递给send中的Promise

#### off(listener)
渲染进程可用

解绑监听窗口消息

#### close([option])
主进程/渲染进程可用

关闭窗口，不传参数将关闭当前窗口


