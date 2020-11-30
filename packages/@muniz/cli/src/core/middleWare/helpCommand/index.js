import React from 'react';
import { Help } from '@muniz/ink-ui';
import i18n from '../../../lib/i18n';

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
          description: i18n.getLocale('command_options_help_tips'),
        },
        {
          key: 'version',
          alias: 'v',
          description: i18n.getLocale('command_options_version_tips'),
        },
      ],
      commands: astCommands,
      usage: { key: `$ muniz <${i18n.getLocale('command')}> [${i18n.getLocale('options')}]`, description: '' },
    };
    switch (argv.command.length) {
      case 0: {
        render(<Help data={helpData} show="command" usage={``} locale={i18n.currentLocale} />);
        break;
      }
      case 1: {
        if (ctx.env.command === 'cli') {
          helpData.commands = astCommands.filter((item) => item.key === argv.command[0])[0];
          helpData.usage = { key: `$ muniz ${argv.command[0]} [${i18n.getLocale('options')}]`, description: '' };

          render(<Help data={helpData} show="options" locale={i18n.currentLocale} />);
        } else {
          helpData.usage = {
            key: `$ muniz ${argv.command[0]} <${i18n.getLocale('command')}> [${i18n.getLocale('options')}]`,
            description: '',
          };
          render(<Help data={helpData} show="command" usage={``} locale={i18n.currentLocale} />);
        }
        break;
      }
      default: {
        helpData.commands = astCommands.filter((item) => item.key === argv.command[1])[0];
        helpData.usage = { key: `$ muniz ${argv.command[1]} [${i18n.getLocale('options')}]`, description: '' };
        render(<Help data={helpData} show="options" locale={i18n.currentLocale} />);
        break;
      }
    }
    process.exit();
  } else {
    next();
  }
};

export default helpCommand;
