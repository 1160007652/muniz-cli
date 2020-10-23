"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _command = _interopRequireDefault(require("../../../command"));

var _inkUi = require("@muniz/ink-ui");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * 执行 命令
 */
var runCommand = function runCommand(ctx, next) {
  var commands = ctx.commands,
      argv = ctx.argv,
      render = ctx.render,
      currentModule = ctx.currentModule,
      env = ctx.env;
  var cliConfig = currentModule.cliConfig,
      i18nLocales = currentModule.i18nLocales;
  var input = argv.input;
  var command = null;

  if (env.command === 'cli') {
    command = _command["default"].command;
  } else {
    command = currentModule.command;
  }

  var commandComponent = command[input[1]] || command["default"];

  if (env.command === 'plugin') {
    if (!command[argv.input[argv.input.length - 1]] && !commandComponent) {
      render( /*#__PURE__*/_react["default"].createElement(_inkUi.NotCommand, ctx));
      process.exit();
    }
  }

  render( /*#__PURE__*/_react["default"].createElement(commandComponent, _objectSpread({}, argv)));
  next();
};

var _default = runCommand;
exports["default"] = _default;