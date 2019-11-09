'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _electron = require('electron');

var _Publisher = require('./Publisher');

var _Publisher2 = _interopRequireDefault(_Publisher);

var _Subscriber = require('./Subscriber');

var _Subscriber2 = _interopRequireDefault(_Subscriber);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(options) {
    _classCallCheck(this, _class);

    this.process = 'renderer';
    this.routes = options.routes || [];
    this.publisher = new _Publisher2.default(this);
    this.subscriber = new _Subscriber2.default(this);
    this.listener = null;
  }
  // 打开/激活窗口


  _createClass(_class, [{
    key: 'push',
    value: function push(option) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        // 监听一次连接事件
        _this.subscriber.onceConnect(function (event, id) {
          resolve(id);
        });
        // 发送请求连接
        _this.publisher.dispatchPush(option);
      });
    }
    // 向指定窗口发送消息

  }, {
    key: 'send',
    value: function send(option, message) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        // 监听一次连接事件
        _this2.subscriber.onceConnect(function (event, id) {
          var key = Math.random().toString();
          // 监听消息返回事件
          _this2.subscriber.bindMessageResponse(key, function (event, message) {
            resolve(message);
          });
          // 发送消息请求
          _this2.publisher.dispatchMessageRequest(id, key, message);
        });
        // 发送请求连接
        _this2.publisher.dispatchPush(option);
      });
    }
    // 监听窗口消息

  }, {
    key: 'on',
    value: function on(handler) {
      var _this3 = this;

      // 监听消息返回事件
      return this.subscriber.bindMessageRequest(function (event, key, message, id) {
        var response = handler(message);
        // 发送消息返回
        _this3.publisher.dispatchMessageResponse(id, key, response);
      });
    }
    // 解绑监听

  }, {
    key: 'off',
    value: function off(listener) {
      listener && this.subscriber.removeMessageRequest(listener);
    }
    // 关闭窗口

  }, {
    key: 'close',
    value: function close(option) {
      if (option && option.name) {
        this.publisher.dispatchClose(option);
      } else {
        _electron.remote.getCurrentWindow().close();
      }
    }
  }, {
    key: 'beforeEach',
    value: function beforeEach() {}
  }, {
    key: 'afterEach',
    value: function afterEach() {}
  }]);

  return _class;
}();

exports.default = _class;