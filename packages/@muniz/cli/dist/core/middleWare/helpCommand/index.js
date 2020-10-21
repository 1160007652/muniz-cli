"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var _servers = require("@muniz/servers");

/**
 * 使用帮助命令
 */
var helpCommand = function helpCommand(ctx, next) {
  var _argv$options;

  var commands = ctx.commands,
      argv = ctx.argv,
      render = ctx.render,
      pkgPath = ctx.pkgPath;

  if ((_argv$options = argv.options) === null || _argv$options === void 0 ? void 0 : _argv$options.help) {
    // console.log(ctx);
    (0, _servers.commandjx)("".concat(pkgPath, "/src/command/App/index.js"));
    console.log('显示 使用帮助');
    process.exit();
  }

  next();
};

var _default = helpCommand;
exports["default"] = _default;