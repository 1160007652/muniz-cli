#!/usr/bin/env node
'use strict';

const semver = require('semver');
const pkgInfo = require('../../package.json');
const requiredVersion = pkgInfo.engines.node;

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

import i18n from '../lib/i18n';
i18n.initI18n();

/**
 *
 * @param {String} wanted 设定的最小兼容版本号
 * @param {String} id npm包名称
 * @description 强制检查 脚手架版本依赖是否大于给定的值
 * @returns 条件成立继续执行,否则退出
 *
 */
function checkNodeVersion(wanted, id) {
  if (!semver.satisfies(process.version, wanted)) {
    console.log(i18n.getLocale('check_node_version_tips', { version: process.version, id, wanted }));
    process.exit(1);
  }
}

checkNodeVersion(requiredVersion, '@muniz/cli');

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
