#!/usr/bin/env node
'use strict';

import React from 'react';
import { render } from 'ink';
import meow from 'meow';
import minimist from 'minimist';

import { UI_APP } from '../ui';
import { command, installCommand } from '../constants/useCommand';
import { default as config } from '../configs';
import { cleanOptions } from '../lib/cleanOptions';

/** 导出模块, 方便 与 其他 plugin 插件 处理机制一致 */
export default {
  config,
};

const _argv = minimist(process.argv.slice(2));

// 是否是内置 Cli 命令
const isInternalCommand = [...command, undefined].includes(_argv._[0]);

// 取 Cli 命令包
let packagePath = '@muniz/cli';

if (!isInternalCommand) {
  const _tempPkgPath = `@muniz/muniz-plugin-${_argv._[0]}`;
  try {
    require(_tempPkgPath);
    packagePath = _tempPkgPath;
  } catch {
    console.log('插件不存在');
    process.exit();
  }
}

const { config: packageConfig } = isInternalCommand ? module.exports.default : require(packagePath).default;

// console.log(packageConfig);
const { cliConfig } = packageConfig;

// 重新生成帮助文档
const help = { ...cliConfig.help, options: cleanOptions(cliConfig.options) };

const program = meow({
  flags: cliConfig.options,
  autoHelp: false,
  autoVersion: false,
});

const context = {
  program,
  help,
  isInternalCommand,
};

render(React.createElement(UI_APP, context));
