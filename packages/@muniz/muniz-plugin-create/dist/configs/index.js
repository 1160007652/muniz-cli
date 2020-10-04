'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _cliConfig = require('./cliConfig');

var _locales = _interopRequireDefault(require('./locales'));

var _default = {
  cliConfig: {
    help: _cliConfig.help,
    options: _cliConfig.options,
  },
  i18nLocales: _locales['default'],
};
exports['default'] = _default;
