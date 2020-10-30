'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'));

var _asyncToGenerator2 = _interopRequireDefault(require('@babel/runtime/helpers/asyncToGenerator'));

var _lowdb = require('../../../../lib/lowdb.js');

var _servers = require('@muniz/servers');

var path = require('path');

var fs = require('fs-extra');

var pro = /*#__PURE__*/ (function () {
  var _ref2 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee(_ref) {
      var _argv$options, _argv$options2;

      var argv, pkgPath, descPath, astCommands;
      return _regenerator['default'].wrap(function _callee$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              (argv = _ref.argv), (pkgPath = _ref.pkgPath);

              if (
                !(
                  ((_argv$options = argv.options) === null || _argv$options === void 0
                    ? void 0
                    : _argv$options.type) === 'desc'
                )
              ) {
                _context.next = 9;
                break;
              }

              descPath = path.join(pkgPath, '/src/command');
              _context.next = 5;
              return (0, _servers.generateCommand)(descPath, descPath);

            case 5:
              astCommands = _context.sent;
              fs.writeJSONSync(path.join(pkgPath, '/dist/configs/commandHelp.json'), astCommands);
              _context.next = 10;
              break;

            case 9:
              if (
                ((_argv$options2 = argv.options) === null || _argv$options2 === void 0
                  ? void 0
                  : _argv$options2.type) === 'plugin'
              ) {
                _lowdb.lowdb.set('MUNIZ_PLUGIN_DEV', false).write();

                console.log('\n「 脚手架插件 」生产模式 - 开启成功');
              } else {
                console.log('主muniz控制器 生产者模式');
              }

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee);
    }),
  );

  return function pro(_x) {
    return _ref2.apply(this, arguments);
  };
})();

var _default = pro;
exports['default'] = _default;
