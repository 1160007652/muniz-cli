'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _common = require('@muniz/common');

var _pro = _interopRequireDefault(require('./pro'));

var _dev = _interopRequireDefault(require('./dev'));

var Version = _common.InkUI.Version;
/**
 * 开发模式命令
 */

var modePro = function modePro(ctx, next) {
  var pkg = ctx.pkg,
    argv = ctx.argv,
    render = ctx.render;
  var options = argv.options;

  if ('mode' in argv.options) {
    var _mode = {
      dev: _dev['default'],
      pro: _pro['default'],
    };

    if (options.mode in _mode) {
      argv.input = argv.input.concat(argv.command);
      argv.command = [];

      _mode[options.mode]({
        argv: argv,
        pkgPath: process.cwd(),
      });
    } else {
      console.log('muniz 脚手架模式切换');
      console.log('支持 dev（开发模式）pro（生产模式）');
    }

    process.exit();
  } else {
    next();
  }
};

var _default = modePro;
exports['default'] = _default;
