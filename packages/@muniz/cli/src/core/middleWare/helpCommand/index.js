import React from 'react';
import { Help } from '@muniz/ink-ui';

import { generateCommand } from '@muniz/servers';

/**
 * 使用帮助命令
 */
const helpCommand = async (ctx, next) => {
  const { commands, argv, render, pkgPath, pkg } = ctx;

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
      commands: await generateCommand(`${pkgPath}/src/command`, `${pkgPath}/src/command`),
      usage: { key: '$ muniz <command> [options]', description: '' },
    };

    switch (argv.input.length) {
      case 0:
      case 1: {
        render(<Help data={helpData} show="command" usage={``} />);
        break;
      }
      default: {
        helpData.commands = helpData.commands.filter((item) => item.key === argv.input[1])[0];
        helpData.usage = { key: `$ muniz ${argv.input[1]} [options]`, description: '' };
        render(<Help data={helpData} show="options" />);
        break;
      }
    }

    process.exit();
  }
  next();
};

export default helpCommand;
