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

var _servers = require("@muniz/servers");

/**
 * 使用帮助命令
 */
var helpCommand = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx, next) {
    var _argv$options;

    var commands, argv, render, pkgPath, pkg, helpData;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            commands = ctx.commands, argv = ctx.argv, render = ctx.render, pkgPath = ctx.pkgPath, pkg = ctx.pkg;

            if (!((_argv$options = argv.options) === null || _argv$options === void 0 ? void 0 : _argv$options.help)) {
              _context.next = 18;
              break;
            }

            _context.t0 = [{
              key: 'help',
              alias: 'h',
              description: '显示帮助文档'
            }, {
              key: 'version',
              alias: 'v',
              description: '显示版本号'
            }];
            _context.next = 5;
            return (0, _servers.generateCommand)("".concat(pkgPath, "/src/command"), "".concat(pkgPath, "/src/command"));

          case 5:
            _context.t1 = _context.sent;
            _context.t2 = {
              key: '$ muniz <command> [options]',
              description: ''
            };
            helpData = {
              otherOptions: _context.t0,
              commands: _context.t1,
              usage: _context.t2
            };
            _context.t3 = argv.input.length;
            _context.next = _context.t3 === 0 ? 11 : _context.t3 === 1 ? 11 : 13;
            break;

          case 11:
            render( /*#__PURE__*/_react["default"].createElement(_inkUi.Help, {
              data: helpData,
              show: "command",
              usage: ""
            }));
            return _context.abrupt("break", 17);

          case 13:
            helpData.commands = helpData.commands.filter(function (item) {
              return item.key === argv.input[1];
            })[0];
            helpData.usage = {
              key: "$ muniz ".concat(argv.input[1], " [options]"),
              description: ''
            };
            render( /*#__PURE__*/_react["default"].createElement(_inkUi.Help, {
              data: helpData,
              show: "options"
            }));
            return _context.abrupt("break", 17);

          case 17:
            process.exit();

          case 18:
            next();

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