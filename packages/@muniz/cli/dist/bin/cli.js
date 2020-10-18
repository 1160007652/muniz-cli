#!/usr/bin/env node
'use strict';

var _ink = require('ink');

var _useCommand = require('../constants/useCommand');

var _CommandApp = require('../core/CommandApp');

// 初始化 命令行 框架
var commandApp = new _CommandApp.CommandApp({
  argv: process.argv.slice(2),
  commands: _useCommand.commands,
  render: _ink.render,
}); // 中间件 => 格式化命令

commandApp.use(_CommandApp.formatArgv); // 中间件 => 判断是否存在命令

commandApp.use(_CommandApp.isCommand); // 中间件 => 执行命令

commandApp.use(_CommandApp.runCommand); // 启动

commandApp.start();
