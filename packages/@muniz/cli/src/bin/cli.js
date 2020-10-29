#!/usr/bin/env node
'use strict';

import { render } from 'ink';
import {
  CommandApp,
  formatArgv,
  mergeArgv,
  helpCommand,
  versionCommand,
  isCommand,
  runCommand,
  mode,
} from '../core/CommandApp';

// 初始化 命令行 框架
const commandApp = new CommandApp({ argv: process.argv.slice(2), render });

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

// 启动
commandApp.start();
