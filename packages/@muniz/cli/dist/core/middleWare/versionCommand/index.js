"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _react = _interopRequireDefault(require("react"));

var _inkUi = require("@muniz/ink-ui");

var _i18n = _interopRequireDefault(require("../../../lib/i18n"));

/**
 * 显示帮助命令
 */
var versionCommand = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx, next) {
    var _argv$options;

    var pkg, argv, render;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pkg = ctx.pkg, argv = ctx.argv, render = ctx.render;

            if (!((_argv$options = argv.options) === null || _argv$options === void 0 ? void 0 : _argv$options.version)) {
              _context.next = 6;
              break;
            }

            render( /*#__PURE__*/_react["default"].createElement(_inkUi.Version, {
              pkg: pkg,
              locale: _i18n["default"].currentLocale
            }));
            process.exit();
            _context.next = 8;
            break;

          case 6:
            _context.next = 8;
            return next();

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function versionCommand(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = versionCommand;
exports["default"] = _default;