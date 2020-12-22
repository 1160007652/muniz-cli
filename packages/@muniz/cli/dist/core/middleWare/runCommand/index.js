"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _react = _interopRequireDefault(require("react"));

var _inkUi = require("@muniz/ink-ui");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var path = require('path');

var MunizConfig = require('../../../configs/system.json');
/**
 * 执行 命令
 */


var runCommand = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx, next) {
    var argv, astCommands, render, env, _astCommands, commandModuleProps, commandModule, _require, pluginCommand, _require2, _pluginCommand;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            argv = ctx.argv, astCommands = ctx.astCommands, render = ctx.render, env = ctx.env;
            _astCommands = [];

            if (env.command === 'cli') {
              _astCommands = astCommands.filter(function (item) {
                return item.key === argv.command[0];
              });
            } else {
              // const pluginConfig = require(path.join(ctx.pkgPath, '/dist/index.js')).default({
              //   locale: MunizConfig.languageLocale,
              // });
              // if (argv.command.length < 2) {
              //   if (pluginConfig?.defaultCommand && !['', 'function', 'undefined'].includes(pluginConfig?.defaultCommand)) {
              //     _astCommands = astCommands.filter((item) => item.key === pluginConfig.defaultCommand);
              //   }
              // } else {
              //   _astCommands = astCommands.filter((item) => item.key === argv.command[1]);
              // }
              _astCommands = astCommands.filter(function (item) {
                return item.key === argv.command[1];
              });
            }

            if (!(_astCommands.length === 0)) {
              _context.next = 7;
              break;
            }

            render( /*#__PURE__*/_react["default"].createElement(_inkUi.NotCommand, (0, _extends2["default"])({}, ctx, {
              isExistPlugin: true,
              locale: MunizConfig.languageLocale
            })));
            _context.next = 22;
            break;

          case 7:
            commandModuleProps = _objectSpread(_objectSpread({}, argv.options), {}, {
              input: argv.input
            });

            if (!(env.command === 'cli')) {
              _context.next = 13;
              break;
            }

            commandModule = require("".concat(ctx.pkgPath, "/dist/command/").concat(_astCommands[0].path))["default"];

            if (_astCommands[0].commandType === 'function') {
              commandModule(commandModuleProps);
            } else {
              render( /*#__PURE__*/_react["default"].createElement(commandModule, commandModuleProps));
            }

            _context.next = 22;
            break;

          case 13:
            if (!MunizConfig.MUNIZ_PLUGIN_DEV) {
              _context.next = 19;
              break;
            }

            _require = require(path.join(ctx.pkgPath)), pluginCommand = _require.pluginCommand;
            _context.next = 17;
            return pluginCommand({
              commandPath: _astCommands[0].path,
              commandType: _astCommands[0].commandType,
              data: commandModuleProps
            });

          case 17:
            _context.next = 22;
            break;

          case 19:
            _require2 = require("".concat(ctx.pkgName)), _pluginCommand = _require2.pluginCommand;
            _context.next = 22;
            return _pluginCommand({
              commandPath: _astCommands[0].path,
              commandType: _astCommands[0].commandType,
              data: commandModuleProps
            });

          case 22:
            _context.next = 24;
            return next();

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function runCommand(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = runCommand;
exports["default"] = _default;