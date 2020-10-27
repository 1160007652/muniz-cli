"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _common = require("@muniz/common");

var _pro = _interopRequireDefault(require("./pro"));

var _dev = _interopRequireDefault(require("./dev"));

var Version = _common.InkUI.Version;
/**
 * 开发模式命令
 */

var modePro = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx, next) {
    var pkg, argv, render, options, _mode;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pkg = ctx.pkg, argv = ctx.argv, render = ctx.render;
            options = argv.options;

            if (!('mode' in argv.options)) {
              _context.next = 16;
              break;
            }

            _mode = {
              dev: _dev["default"],
              pro: _pro["default"]
            };

            if (!(options.mode in _mode)) {
              _context.next = 11;
              break;
            }

            argv.input = argv.input.concat(argv.command);
            argv.command = [];
            _context.next = 9;
            return _mode[options.mode]({
              argv: argv,
              pkgPath: process.cwd()
            });

          case 9:
            _context.next = 13;
            break;

          case 11:
            console.log('muniz 脚手架模式切换');
            console.log('支持 dev（开发模式）pro（生产模式）');

          case 13:
            process.exit();
            _context.next = 17;
            break;

          case 16:
            next();

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function modePro(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = modePro;
exports["default"] = _default;