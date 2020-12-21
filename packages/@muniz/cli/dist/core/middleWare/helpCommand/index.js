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
 * 使用帮助命令
 */
var helpCommand = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx, next) {
    var _argv$options;

    var argv, render, astCommands, helpData;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            argv = ctx.argv, render = ctx.render, astCommands = ctx.astCommands;

            if (!((_argv$options = argv.options) === null || _argv$options === void 0 ? void 0 : _argv$options.help)) {
              _context.next = 17;
              break;
            }

            // 组合帮助文档数据
            helpData = {
              otherOptions: [{
                key: 'help',
                alias: 'h',
                description: _i18n["default"].getLocale('command_options_help_tips')
              }, {
                key: 'version',
                alias: 'v',
                description: _i18n["default"].getLocale('command_options_version_tips')
              }],
              commands: astCommands,
              usage: {
                key: "$ muniz <".concat(_i18n["default"].getLocale('command'), "> [").concat(_i18n["default"].getLocale('options'), "]"),
                description: ''
              }
            };
            _context.t0 = argv.command.length;
            _context.next = _context.t0 === 0 ? 6 : _context.t0 === 1 ? 8 : 10;
            break;

          case 6:
            render( /*#__PURE__*/_react["default"].createElement(_inkUi.Help, {
              data: helpData,
              show: "command",
              usage: "",
              locale: _i18n["default"].currentLocale
            }));
            return _context.abrupt("break", 14);

          case 8:
            if (ctx.env.command === 'cli') {
              helpData.commands = astCommands.filter(function (item) {
                return item.key === argv.command[0];
              })[0];
              helpData.usage = {
                key: "$ muniz ".concat(argv.command[0], " [").concat(_i18n["default"].getLocale('options'), "]"),
                description: ''
              };
              render( /*#__PURE__*/_react["default"].createElement(_inkUi.Help, {
                data: helpData,
                show: "options",
                locale: _i18n["default"].currentLocale
              }));
            } else {
              helpData.usage = {
                key: "$ muniz ".concat(argv.command[0], " <").concat(_i18n["default"].getLocale('command'), "> [").concat(_i18n["default"].getLocale('options'), "]"),
                description: ''
              };
              render( /*#__PURE__*/_react["default"].createElement(_inkUi.Help, {
                data: helpData,
                show: "command",
                usage: "",
                locale: _i18n["default"].currentLocale
              }));
            }

            return _context.abrupt("break", 14);

          case 10:
            helpData.commands = astCommands.filter(function (item) {
              return item.key === argv.command[1];
            })[0];
            helpData.usage = {
              key: "$ muniz ".concat(argv.command[1], " [").concat(_i18n["default"].getLocale('options'), "]"),
              description: ''
            };
            render( /*#__PURE__*/_react["default"].createElement(_inkUi.Help, {
              data: helpData,
              show: "options",
              locale: _i18n["default"].currentLocale
            }));
            return _context.abrupt("break", 14);

          case 14:
            process.exit();
            _context.next = 19;
            break;

          case 17:
            _context.next = 19;
            return next();

          case 19:
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