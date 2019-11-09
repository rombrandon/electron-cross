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
  // 监听一次连接事件


  _createClass(_class, [{
    key: 'onceConnect',
    value: function onceConnect(callback) {
      _electron.ipcRenderer.once(_cross2.default.MAIN_ROUTER_CONNECT, function () {
        return callback.apply(undefined, arguments);
      });
    }
    // 监听消息请求事件

  }, {
    key: 'bindMessageRequest',
    value: function bindMessageRequest(callback) {
      var listener = function listener() {
        return callback.apply(undefined, arguments);
      };
      _electron.ipcRenderer.on(_cross2.default.MESSAGE_CONNECT_REQUEST, listener);
      return listener;
    }
    // 取消监听消息请求事件

  }, {
    key: 'removeMessageRequest',
    value: function removeMessageRequest(listener) {
      _electron.ipcRenderer.removeListener(_cross2.default.MESSAGE_CONNECT_REQUEST, listener);
    }
    // 监听消息返回事件

  }, {
    key: 'bindMessageResponse',
    value: function bindMessageResponse(key, callback) {
      var responseHandler = function responseHandler(event, keys, message) {
        // 消息解绑
        if (key === keys) {
          _electron.ipcRenderer.removeListener(_cross2.default.MESSAGE_CONNECT_RESPONSE, responseHandler);
          callback(event, message);
        }
      };
      _electron.ipcRenderer.on(_cross2.default.MESSAGE_CONNECT_RESPONSE, responseHandler);
    }
  }]);

  return _class;
}();

exports.default = _class;