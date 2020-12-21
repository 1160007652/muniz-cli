const path = require('path');
import React from 'react';
import { NotCommand } from '@muniz/ink-ui';
const MunizConfig = require('../../../configs/system.json');
/**
 * 执行 命令
 */
const runCommand = async (ctx, next) => {
  const { argv, astCommands, render, env } = ctx;

  let _astCommands = [];
  if (env.command === 'cli') {
    _astCommands = astCommands.filter((item) => item.key === argv.command[0]);
  } else {
    const pluginConfig = require(path.join(ctx.pkgPath, '/dist/index.js')).default({
      locale: MunizConfig.languageLocale,
    });
    // if (argv.command.length < 2) {
    //   if (pluginConfig?.defaultCommand && !['', 'function', 'undefined'].includes(pluginConfig?.defaultCommand)) {
    //     _astCommands = astCommands.filter((item) => item.key === pluginConfig.defaultCommand);
    //   }
    // } else {
    //   _astCommands = astCommands.filter((item) => item.key === argv.command[1]);
    // }
    _astCommands = astCommands.filter((item) => item.key === argv.command[1]);
  }

  if (_astCommands.length === 0) {
    render(<NotCommand {...ctx} isExistPlugin locale={MunizConfig.languageLocale} />);
  } else {
    const commandModuleProps = {
      ...argv.options,
      input: argv.input,
    };
    if (env.command === 'cli') {
      const commandModule = require(`${ctx.pkgPath}/dist/command/${_astCommands[0].path}`).default;

      if (_astCommands[0].commandType === 'function') {
        commandModule(commandModuleProps);
      } else {
        render(React.createElement(commandModule, commandModuleProps));
      }
    } else {
      // 当前执行插件, 是否是 走 开发状态 通道
      if (MunizConfig.MUNIZ_PLUGIN_DEV) {
        const { pluginCommand } = require(path.join(ctx.pkgPath));
        await pluginCommand({
          commandPath: _astCommands[0].path,
          commandType: _astCommands[0].commandType,
          data: commandModuleProps,
        });
      } else {
        const { pluginCommand } = require(`${ctx.pkgName}`);
        await pluginCommand({
          commandPath: _astCommands[0].path,
          commandType: _astCommands[0].commandType,
          data: commandModuleProps,
        });
      }
    }
  }
  await next();
};

export default runCommand;
