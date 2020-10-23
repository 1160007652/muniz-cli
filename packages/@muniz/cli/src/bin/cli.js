#!/usr/bin/env node
'use strict';

import { render } from 'ink';
import { commands, installCommands } from '../constants/useCommand';

import {
  CommandApp,
  formatArgv,
  mergeArgv,
  helpCommand,
  versionCommand,
  isCommand,
  runCommand,
} from '../core/CommandApp';

import { default as config } from '../configs';

/** 导出模块, 方便 与 其他 plugin 插件 处理机制一致 */

// 初始化 命令行 框架
const commandApp = new CommandApp({ argv: process.argv.slice(2), commands, render, currentModule: config });

// 中间件 => 格式化命令
commandApp.use(formatArgv);

// 中间件 => 判断是否存在命令
commandApp.use(isCommand);

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
