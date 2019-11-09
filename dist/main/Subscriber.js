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

  _createClass(_class, [{
    key: 'initialize',
    value: function initialize() {
      var _this = this;

      _electron.ipcMain.on(_cross2.default.RENDERER_ROUTER_PUSH, function (event, option) {
        var defined = _this.router.findInApps(option.name);
        var route = _this.router.push(option);
        if (defined) {
          event.sender.send(_cross2.default.MAIN_ROUTER_CONNECT, route.id);
        } else {
          route.app.webContents.on('did-finish-load', function () {
            event.sender.send(_cross2.default.MAIN_ROUTER_CONNECT, route.id);
          });
        }
      });
      _electron.ipcMain.on(_cross2.default.RENDERER_ROUTER_CLOSE, function (event, option) {
        var defined = _this.router.findInApps(option.name);
        defined && defined.app.close();
      });
    }
  }]);

  return _class;
}();

exports.default = _class;