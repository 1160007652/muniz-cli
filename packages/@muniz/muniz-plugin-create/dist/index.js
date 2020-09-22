'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _configs = _interopRequireDefault(require('./configs'));

var _Create = _interopRequireDefault(require('./ui/Create'));

var _Ad = _interopRequireDefault(require('./ui/Ad'));

var _default = {
  config: _configs['default'],
  ad: _Ad['default'],
  create1: _Create['default'],
  default: _Ad['default'],
};
exports['default'] = _default;
