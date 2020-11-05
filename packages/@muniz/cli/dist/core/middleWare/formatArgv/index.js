"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cleanArgv = _interopRequireDefault(require("./cleanArgv"));

/**
 * 格式化 命令行 argv
 */

/**
 * 中间价：清晰数据
 */
var formatArgv = function formatArgv(ctx, next) {
  var argv = ctx.argv;
  ctx.argv = (0, _cleanArgv["default"])(argv);
  next();
};

var _default = formatArgv;
exports["default"] = _default;