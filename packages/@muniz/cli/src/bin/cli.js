#!/usr/bin/env node
'use strict';

import { render } from 'ink';
import { commands, installCommands } from '../constants/useCommand';
import { CommandApp, formatArgv, isCommand, runCommand } from '../core/CommandApp';

// 初始化 命令行 框架
const commandApp = new CommandApp({ argv: process.argv.slice(2), commands, render });

// 中间件 => 格式化命令
commandApp.use(formatArgv);

// 中间件 => 判断是否存在命令
commandApp.use(isCommand);

// 中间件 => 执行命令
commandApp.use(runCommand);

// 启动
commandApp.start();
