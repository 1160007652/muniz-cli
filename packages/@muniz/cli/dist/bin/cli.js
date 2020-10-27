#!/usr/bin/env node
'use strict';

var _common = require("@muniz/common");

var _CommandApp = require("../core/CommandApp");

var render = _common.Ink.render;
// 初始化 命令行 框架
var commandApp = new _CommandApp.CommandApp({
  argv: process.argv.slice(2),
  render: render
}); // 中间件 => 格式化命令

commandApp.use(_CommandApp.formatArgv); // 中间件 => 判断是否存在命令

commandApp.use(_CommandApp.isCommand);
/**
 * 中间件
 * 开发者模式 用于执行 dev  eg: muniz --mode=dev
 * 生产者模式 用于执行 build eg: muniz --mode=pro
 */

commandApp.use(_CommandApp.mode); // 中间件 => 整合 cmd 命令参数

commandApp.use(_CommandApp.mergeArgv); // 中间件 => 显示使用帮助

commandApp.use(_CommandApp.helpCommand); // 中间件 => 显示版本号

commandApp.use(_CommandApp.versionCommand); // 中间件 => 执行命令

commandApp.use(_CommandApp.runCommand); // 启动

commandApp.start();