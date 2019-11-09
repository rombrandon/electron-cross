'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _electron = require('electron');

var _Router = require('./main/Router');

var _Router2 = _interopRequireDefault(_Router);

var _Router3 = require('./renderer/Router');

var _Router4 = _interopRequireDefault(_Router3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = !_electron.BrowserWindow ? _Router4.default : _Router2.default;