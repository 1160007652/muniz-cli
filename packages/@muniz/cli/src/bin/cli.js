#!/usr/bin/env node
'use strict';

import React from 'react';
import { render } from 'ink';
import meow from 'meow';

import { UI_Command, UI_Create } from '../ui';

import i18n from '@muniz/muniz-plugin-i18n';

const program = meow({
  flags: {
    help: {
      type: 'boolean',
      alias: 'h',
    },
    version: {
      type: 'boolean',
      alias: 'v',
    },
  },
  autoHelp: false,
});

/**
 * @description 输入命令小于 2 位,打印 使用帮助文档
 */
if (!process.argv.slice(2).length) {
  // program.showHelp();
  render(React.createElement(UI_Command, program.flags));
}

const { input, flags } = program;

if (input.length === 0 && flags.help) {
  render(React.createElement(UI_Command, program.flags));
  process.exit();
}

if (input.length > 0 && flags.help) {
  console.log('打印子命令 help 文档');
  process.exit();
}

if (input.length > 0 && !flags.help) {
  const commander = {
    create: (options) => {
      render(React.createElement(UI_Create, options));
    },
    add: () => {
      console.log('安装插件');
    },
  };

  // 执行子命令
  if ([input[0]] in commander) {
    commander?.[input[0]]({ input, flags });
  } else {
    console.log(`不存在命令 ${input[0]}`);
  }
}
// console.log(cli);
