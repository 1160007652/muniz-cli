#!/usr/bin/env node
'use strict';

import React from 'react';
import { render } from 'ink';
import meow from 'meow';

import { UI_Help, UI_Create } from '../ui';
import { cliHelp } from '../config';

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

const commander = {
  add: () => {
    console.log('安装插件');
  },
};

async function _start() {
  /**
   * @description 输入命令小于 2 位,打印 使用帮助文档
   */
  if (!process.argv.slice(2).length) {
    // program.showHelp();
    render(React.createElement(UI_Help, { flags: program.flags, data: cliHelp }));
  }

  const { input, flags } = program;

  if (input.length === 0 && flags.help) {
    render(React.createElement(UI_Help, { flags: program.flags, data: cliHelp }));
    process.exit();
  }

  if (input.length > 0 && flags.help && input[0] in commander) {
    console.log('打印子命令 help 文档');
    process.exit();
  }

  if (input.length > 0) {
    // 执行子命令
    if ([input[0]] in commander) {
      commander?.[input[0]]({ input, flags });
    } else {
      try {
        // 使用插件命令
        const { default: plugin } = await import(`@muniz/muniz-plugin-${input[0]}`);
        const { config } = plugin;

        if (flags.help) {
          render(React.createElement(UI_Help, { flags: program.flags, data: config.cliHelp }));
        }

        // 执行插件 默认命令
        if (input.length === 1) {
          if (plugin?.default) {
            if (plugin.default === 'help') {
              render(React.createElement(UI_Help, { flags: program.flags, data: config.cliHelp }));
            } else if (plugin.default in plugin && !['config'].includes(plugin.default)) {
              plugin[plugin.default](program);
            } else {
              console.log(`插件不存在命令 ${input[0]}`, e);
            }
          }
        } else if (input.length >= 2) {
          if (input[1] in plugin && !['config'].includes(input[1])) {
            // 执行 插件的 非默认 子命令
            plugin[input[1]](program);
          } else {
            console.log(`插件不存在命令 ${input[1]}`);
          }
        }
      } catch {
        console.log(`${input[0]} 插件不存在`);
      }
    }
  }
}
// console.log(cli);
_start();
