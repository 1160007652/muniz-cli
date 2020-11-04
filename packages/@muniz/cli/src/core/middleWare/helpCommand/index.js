import React from 'react';
import { Help } from '@muniz/ink-ui';
import i18n from '@muniz/cli-i18n';
import languages from '../../../configs/locales';

/**
 * 使用帮助命令
 */
const helpCommand = (ctx, next) => {
  const { argv, render, astCommands } = ctx;
  i18n.setlanguages({ languages });

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
      usage: { key: '$ muniz <command> [options]', description: '' },
    };
    switch (argv.command.length) {
      case 0: {
        render(<Help data={helpData} show="command" usage={``} locale={i18n.locale} />);
        break;
      }
      case 1: {
        if (ctx.env.command === 'cli') {
          helpData.commands = astCommands.filter((item) => item.key === argv.command[0])[0];
          helpData.usage = { key: `$ muniz ${argv.command[0]} [options]`, description: '' };

          render(<Help data={helpData} show="options" locale={i18n.locale} />);
        } else {
          render(<Help data={helpData} show="command" usage={``} locale={i18n.locale} />);
        }
        break;
      }
      default: {
        helpData.commands = astCommands.filter((item) => item.key === argv.command[1])[0];
        helpData.usage = { key: `$ muniz ${argv.command[1]} [options]`, description: '' };
        render(<Help data={helpData} show="options" />);
        break;
      }
    }
    process.exit();
  } else {
    next();
  }
};

export default helpCommand;
