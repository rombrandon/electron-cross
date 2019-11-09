'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _electron = require('electron');

var _Subscriber = require('./Subscriber');

var _Subscriber2 = _interopRequireDefault(_Subscriber);

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, _class);

    this.process = 'main';
    this.apps = [];

    var base = options.base,
        menu = options.menu,
        routes = options.routes,
        root = options.root,
        arg = _objectWithoutProperties(options, ['base', 'menu', 'routes', 'root']);
    // 路由地址


    this.base = base || '';
    // 菜单实例
    this.menu = new _Menu2.default(menu);
    // 路由配置
    this.routes = routes || [];
    // 首屏
    this.root = root || this.routes[0].name;
    // 配置项
    this.options = _extends({}, arg);
    // 初始化监听器
    this.subscriber = new _Subscriber2.default(this);
    this.subscriber.initialize();
  }
  /**
   * Public
   * **/
  // 初始化首页 - 返回窗口实例


  _createClass(_class, [{
    key: 'init',
    value: function init() {
      return this.push({ name: this.root });
    }
    // 打开/激活窗口 - 返回路由对象
    // option = {name: 'index', config: {}, focus: false}

  }, {
    key: 'push',
    value: function push(option) {
      var route = this.findInApps(option.name) || this.createRoute(option.name, option.config);
      if (option.focus !== false) {
        route.app.focus();
      }
      return route;
    }
    // 创建页面前回调

  }, {
    key: 'beforeEach',
    value: function beforeEach(callback) {
      if (callback instanceof Function) {
        this.beforeCallback = callback;
      }
    }
    // 创建页面后回调

  }, {
    key: 'afterEach',
    value: function afterEach(callback) {
      if (callback instanceof Function) {
        this.afterCallback = callback;
      }
    }
    /**
     * Private
     * **/
    // 创建路由

  }, {
    key: 'createRoute',
    value: function createRoute(name) {
      var _this = this;

      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var app = this.createApp(name, config);
      app.on('closed', function () {
        _this.apps = _this.apps.filter(function (route) {
          return route.name !== name;
        });
      });
      var route = { app: app, name: name, id: app.id };
      this.apps.push(route);
      return route;
    }
    // 新开窗口

  }, {
    key: 'createApp',
    value: function createApp(name) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var route = this.findInRoutes(name);
      this.beforeCallback(this);
      var app = new _electron.BrowserWindow(Object.assign({
        webPreferences: {
          nodeIntegration: true
        }
      }, this.options, route.config, config));
      // 加载页面
      if (route.url) {
        app.loadURL(this.base + route.url);
      } else if (route.file) {
        app.loadFile(this.base + route.file);
      }
      // 加载菜单
      this.menu.initialize(config.menu);
      this.afterCallback(app, route);
      return app;
    }
    // 配置中查找窗口

  }, {
    key: 'findInRoutes',
    value: function findInRoutes(name) {
      var route = this.routes.find(function (route) {
        return route.name === name;
      });
      if (!route) throw new Error(name + '\u8DEF\u7531\u4E0D\u5B58\u5728');
      return route;
    }
    // 窗口集合中查找窗口

  }, {
    key: 'findInApps',
    value: function findInApps(name) {
      return this.apps.find(function (route) {
        return route.name === name;
      });
    }
  }, {
    key: 'beforeCallback',
    value: function beforeCallback() {}
  }, {
    key: 'afterCallback',
    value: function afterCallback() {}
  }]);

  return _class;
}();

exports.default = _class;