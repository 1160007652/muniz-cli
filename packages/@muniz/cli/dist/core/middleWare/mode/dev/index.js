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
    _lowdb.lowdb.set('MUNIZ_PLUGIN_DEV', true).write();

    console.log('\n「 脚手架插件 」开发者模式 - 开启成功');
  } else {
    console.log('主muniz控制器 开发者模式');
  }
};

var _default = dev;
exports['default'] = _default;
