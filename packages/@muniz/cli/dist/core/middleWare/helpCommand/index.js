"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var _command = require("../../../command");

var _servers = require("@muniz/servers");

/**
 * 使用帮助命令
 */
var helpCommand = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx, next) {
    var _argv$options;

    var commands, argv, render, pkgPath, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commands = ctx.commands, argv = ctx.argv, render = ctx.render, pkgPath = ctx.pkgPath;

            if (!((_argv$options = argv.options) === null || _argv$options === void 0 ? void 0 : _argv$options.help)) {
              _context.next = 8;
              break;
            }

            _context.next = 4;
            return (0, _servers.generateCommand)("".concat(pkgPath, "/src/command"), "".concat(pkgPath, "/src/command"));

          case 4:
            result = _context.sent;

            if ([0, 1].includes(argv.input.length)) {
              render( /*#__PURE__*/_react["default"].createElement(_command.UI_Help, {
                data: result,
                show: "command",
                usage: "$ muniz <command> [options]"
              }));
            }

            if (argv.input.length === 2) {
              result = result.filter(function (item) {
                return item.key === argv.input[1];
              })[0];
              render( /*#__PURE__*/_react["default"].createElement(_command.UI_Help, {
                data: result,
                show: "options",
                usage: "$ muniz ".concat(argv.input[1], " [options]")
              }));
            } // console.log('显示 使用帮助\n', result.options);


            process.exit();

          case 8:
            next();

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function helpCommand(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = helpCommand;
exports["default"] = _default;