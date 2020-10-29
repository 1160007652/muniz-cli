'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _lowdb = require('../../../../lib/lowdb.js');

var dev = function dev(_ref) {
  var _argv$options;

  var argv = _ref.argv,
    pkgPath = _ref.pkgPath;

  if (
    ((_argv$options = argv.options) === null || _argv$options === void 0 ? void 0 : _argv$options.type) === 'plugin'
  ) {
    console.log('开启脚手架插件开发者模式');

    _lowdb.lowdb.set('MUNIZ_PLUGIN_DEV', true).write();

    console.log(_lowdb.lowdb.get('MUNIZ_CLI_DEBUG').value());
    console.log(_lowdb.lowdb.get('plugins').value());
  } else {
    console.log(_lowdb.lowdb.get('MUNIZ_PLUGIN_DEV').value());
    console.log('主muniz控制器 开发者模式');
  }
};

var _default = dev;
exports['default'] = _default;
