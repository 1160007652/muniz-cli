#!/usr/bin/env node
'use strict';

// 检查执行用户权限，Root 权限会进行降级
require('root-check')();

import { render } from 'ink';

// 初始化多语言
import i18n from '../lib/i18n';
i18n.initI18n();

import {
  CommandApp,
  formatArgv,
  mergeArgv,
  helpCommand,
  versionCommand,
  isCommand,
  runCommand,
  mode,
  errorExpand,
} from '../core/CommandApp';

// 检查 Node.js 版本号
require('../lib/checkNodeVersion')('@muniz-cli');

// 初始化 命令行 框架
const commandApp = new CommandApp({ argv: process.argv.slice(2), render });

// 中间件 => 统一捕捉错误信息
commandApp.use(errorExpand);

// 中间件 => 格式化命令
commandApp.use(formatArgv);

// 中间件 => 判断是否存在命令
commandApp.use(isCommand);

/**
 * 中间件
 * 开发者模式 用于执行 dev  eg: muniz --mode=dev
 * 生产者模式 用于执行 build eg: muniz --mode=pro
 */
commandApp.use(mode);

// 中间件 => 整合 cmd 命令参数
commandApp.use(mergeArgv);

// 中间件 => 显示使用帮助
commandApp.use(helpCommand);

// 中间件 => 显示版本号
commandApp.use(versionCommand);

// 中间件 => 执行命令
commandApp.use(runCommand);

module.exports = () => {
  // 启动
  commandApp.start();
};
