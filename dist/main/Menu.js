'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _electron = require('electron');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(options) {
    _classCallCheck(this, _class);

    this.base = options;
  }

  _createClass(_class, [{
    key: 'initialize',
    value: function initialize(options) {
      var template = options || this.base;
      if (template) {
        return this.create(template);
      } else if (template !== false) {
        return this.destroy();
      }
    }
    // 创建菜单

  }, {
    key: 'create',
    value: function create(template) {
      _electron.Menu.setApplicationMenu(_electron.Menu.buildFromTemplate(template));
    }
    // 隐藏菜单

  }, {
    key: 'destroy',
    value: function destroy() {
      // darwin表示macOS，针对macOS的设置
      if (process.platform === 'darwin') {
        var template = [{ label: 'menu', submenu: [{ role: 'about' }, { role: 'quit' }] }];
        var menu = _electron.Menu.buildFromTemplate(template);
        _electron.Menu.setApplicationMenu(menu);
      } else {
        // windows及linux系统
        _electron.Menu.setApplicationMenu(null);
      }
    }
  }]);

  return _class;
}();

exports.default = _class;