#!/usr/bin/env node
'use strict';

import React from 'react';
import { render } from 'ink';
import meow from 'meow';
import minimist from 'minimist';

import { command, installCommand } from '../constants/useCommand';
import { config } from '../config';

export default {
  config,
};

import { UI_Create } from '../ui';

const _argv = minimist(process.argv.slice(2));

// 是否是内置 Cli 命令
const isInternalCommand = [...command, undefined].includes(_argv._[0]);

// 取 Cli 命令包
const packagePath = isInternalCommand ? '@muniz/cli' : `@muniz/muniz-plugin-${_argv._[0]}`;

const packageConfig = isInternalCommand ? module.exports.default : require(packagePath).default;

console.log(packageConfig);

const program = meow({
  flags: {
    name: {
      type: 'string',
      alias: 'n',
      default: 'zhipan',
    },
    isOpen: {
      type: 'boolean',
    },
  },
  autoHelp: false,
  autoVersion: false,
});

const context = {
  program,
};

render(React.createElement(UI_Create, context));
