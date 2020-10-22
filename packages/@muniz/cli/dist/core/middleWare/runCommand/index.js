"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

/**
 * 执行 命令
 */
var runCommand = function runCommand(ctx, next) {
  var commands = ctx.commands,
      argv = ctx.argv,
      render = ctx.render,
      currentModule = ctx.currentModule;
  var cliConfig = currentModule.cliConfig,
      i18nLocales = currentModule.i18nLocales;
  console.log(ctx);
  next();
};

var _default = runCommand;
exports["default"] = _default;