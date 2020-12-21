"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _cleanArgv = _interopRequireDefault(require("./cleanArgv"));

/**
 * 格式化 命令行 argv
 */
var minimist = require('minimist');
/**
 * 中间价：清晰数据
 */


var formatArgv = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx, next) {
    var argv;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            argv = ctx.argv;
            ctx.argv = (0, _cleanArgv["default"])(minimist(argv));
            _context.next = 4;
            return next();

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function formatArgv(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = formatArgv;
exports["default"] = _default;