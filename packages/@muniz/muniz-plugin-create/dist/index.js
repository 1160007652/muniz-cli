'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _configs = _interopRequireDefault(require('./configs'));

var _Create = _interopRequireDefault(require('./ui/Create'));

var _Update = _interopRequireDefault(require('./ui/Update'));

var _default = {
  config: _configs['default'],
  command: {
    update: _Update['default'],
    default: _Create['default'], // 默认执行的命令
  },
};
exports['default'] = _default;
