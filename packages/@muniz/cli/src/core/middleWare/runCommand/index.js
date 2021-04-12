import React from 'react';
import { NotCommand } from '@muniz/ink-ui';
const MunizConfig = require('../../../configs/system.json');
/**
 * 执行 命令
 */
const runCommand = async (ctx, next) => {
  const { argv, astCommands, render, env } = ctx;
  let _astCommands = null;
  if (env.command === 'cli') {
    _astCommands = astCommands.find((item) => item.key === argv.command[0]);
  } else {
    _astCommands = astCommands.find((item) => item.key === argv.command[1]);
  }

  if (!_astCommands) {
    render(<NotCommand {...ctx} isExistPlugin locale={MunizConfig.languageLocale} />);
  } else {
    const commandModuleProps = {
      ...argv.options,
      input: argv.input,
    };
    try {
      if (env.command === 'cli') {
        const commandModule = require(`${ctx.pkgPath}/command/${_astCommands.path}`).default;

        if (_astCommands.commandType === 'function') {
          await commandModule(commandModuleProps);
        } else {
          render(React.createElement(commandModule, commandModuleProps));
        }
      } else {
        // 当前执行插件, 是否是 走 开发状态 通道
        if (process.env.EXTERNAL_PLUGIN_ENV !== 'development') {
          const { pluginCommand } = require(ctx.pkgPath);
          pluginCommand({
            commandPath: _astCommands.path,
            commandType: _astCommands.commandType,
            data: commandModuleProps,
          });
        } else {
          const { pluginCommand } = require(`${ctx.pkgName}`);
          pluginCommand({
            commandPath: _astCommands[0].path,
            commandType: _astCommands[0].commandType,
            data: commandModuleProps,
          });
        }
      }
    } catch (error) {
      if (process.env.CLI_ENV === '1development') {
        console.log(error);
      } else {
        console.log(error.message);
      }
    }
  }
  await next();
};

export default runCommand;
