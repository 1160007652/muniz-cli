import React from 'react';
import { Help } from '@muniz/ink-ui';

/**
 * 使用帮助命令
 */
const helpCommand = (ctx, next) => {
  const { argv, render, astCommands } = ctx;

  if (argv.options?.help) {
    // 组合帮助文档数据
    const helpData = {
      otherOptions: [
        {
          key: 'help',
          alias: 'h',
          description: '显示帮助文档',
        },
        {
          key: 'version',
          alias: 'v',
          description: '显示版本号',
        },
      ],
      commands: astCommands,
      usage: { key: '$ muniz <command> [options]', description: '' },
    };
    switch (argv.command.length) {
      case 0: {
        render(<Help data={helpData} show="command" usage={``} />);
        break;
      }
      case 1: {
        if (ctx.env.command === 'cli') {
          helpData.commands = astCommands.filter((item) => item.key === argv.command[0])[0];
          helpData.usage = { key: `$ muniz ${argv.command[0]} [options]`, description: '' };

          render(<Help data={helpData} show="options" />);
        } else {
          render(<Help data={helpData} show="command" usage={``} />);
        }
        break;
      }
      default: {
        const pluginConfig = require(`${ctx.pkgPath}/dist/index.js`).default(1);
        if (pluginConfig?.defaultCommand && !['', 'function', 'undefined'].includes(pluginConfig?.defaultCommand)) {
          render(<Help data={helpData} show="command" usage={``} />);
        } else {
          helpData.commands = astCommands.filter((item) => item.key === argv.command[1])[0];
          helpData.usage = { key: `$ muniz ${argv.command[1]} [options]`, description: '' };
          render(<Help data={helpData} show="options" />);
        }
        break;
      }
    }
    process.exit();
  } else {
    next();
  }
};

export default helpCommand;
