'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _electron = require('electron');

var _cross = require('../cross');

var _cross2 = _interopRequireDefault(_cross);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(router) {
    _classCallCheck(this, _class);

    this.router = router;
  }
  // 发送窗口请求


  _createClass(_class, [{
    key: 'dispatchPush',
    value: function dispatchPush(option) {
      _electron.ipcRenderer.send(_cross2.default.RENDERER_ROUTER_PUSH, option);
    }
    // 发送窗口关闭请求

  }, {
    key: 'dispatchClose',
    value: function dispatchClose(option) {
      _electron.ipcRenderer.send(_cross2.default.RENDERER_ROUTER_CLOSE, option);
    }
    // 发送消息请求

  }, {
    key: 'dispatchMessageRequest',
    value: function dispatchMessageRequest(id, key, message) {
      var app = _electron.remote.BrowserWindow.fromId(id);
      app.webContents.send(_cross2.default.MESSAGE_CONNECT_REQUEST, key, message, _electron.remote.getCurrentWindow().id);
    }
    // 发送消息返回

  }, {
    key: 'dispatchMessageResponse',
    value: function dispatchMessageResponse(id, key, response) {
      var app = _electron.remote.BrowserWindow.fromId(id);
      app.webContents.send(_cross2.default.MESSAGE_CONNECT_RESPONSE, key, response);
    }
  }]);

  return _class;
}();

exports.default = _class;