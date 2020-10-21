#!/usr/bin/env node
'use strict';

import React from 'react';
import { render } from 'ink';
import meow from 'meow';
import minimist from 'minimist';

import { UI_APP, UI_NotCommand } from '../command';
import { command, installCommand } from '../constants/useCommand';
import { default as config } from '../configs';
import { cleanOptions } from '../lib/cleanOptions';
import { initI18nLocales, i18n } from '@muniz/muniz-plugin-i18n';

/** 导出模块, 方便 与 其他 plugin 插件 处理机制一致 */
export default {
  config,
};

const _argv = minimist(process.argv.slice(2));

// 是否是内置 Cli 命令
const isInternalCommand = [...command, undefined].includes(_argv._[0]);

// 取 Cli 命令包
let packageName = '@muniz/cli';
// 取 CLi 包的路径 ， 如 xxx/xxx/@muniz/cli  || xxx/xxx/@muniz/muniz-plugin-xxx
let packageJsonPath = __filename.replace(new RegExp('(@muniz/cli)/.*$', 'ig'), (_, c) => c);

if (!isInternalCommand) {
  const _tempPkgPath = `@muniz/muniz-plugin-${_argv._[0]}`;

  try {
    const _tempPkgJsonPath = require.resolve(_tempPkgPath);
    packageName = _tempPkgPath;
    packageJsonPath = _tempPkgJsonPath.replace(new RegExp(`(${_tempPkgPath})/.*$`, 'ig'), (_, c) => c);
  } catch {
    // 初始化多语言
    initI18nLocales({ locales: config.i18nLocales, init: true });
    const _notCommandData = {
      isInternalCommand: !isInternalCommand,
      packageName: _tempPkgPath,
      command: _argv._[0],
    };
    render(React.createElement(UI_NotCommand, _notCommandData));
    process.exit();
  }
}

const { config: packageConfig } = isInternalCommand ? module.exports.default : require(packageName).default;

// console.log(packageConfig);
const { cliConfig, i18nLocales } = packageConfig;

// 初始化多语言
initI18nLocales({ locales: i18nLocales, init: true });

const packageJsonInfo = require(`${packageJsonPath}/package.json`);
// 重新生成帮助文档
const help = { ...cliConfig.help, options: cleanOptions(cliConfig.options) };
// 重新生成版本号
//
const version = { version: packageJsonInfo.version, author: packageJsonInfo.author, name: packageJsonInfo.name };

const program = meow({
  flags: cliConfig.options,
  autoHelp: false,
  autoVersion: false,
});

const context = {
  program,
  help,
  version,
  isInternalCommand,
  packageJsonPath,
  packageJsonInfo,
};

render(React.createElement(UI_APP, context));
