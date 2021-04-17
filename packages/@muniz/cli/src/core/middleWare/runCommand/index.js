import React from 'react';
import ErrorExceptionType from '../../../configs/errorExceptionType';
import i18n from '../../../lib/i18n';

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
    // 检查到插件存在, 但是插件中不存在 准备 执行的命令
    throw new Error(ErrorExceptionType.PLUGIN_NOT_COMMAND);
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
          await render(React.createElement(commandModule, commandModuleProps));
        }
      } else {
        // 当前执行插件, 是否是 走 开发状态 通道
        if (process.env.EXTERNAL_PLUGIN_ENV === 'development') {
          const { pluginLife, pluginCommand } = require(ctx.pkgPath);
          pluginLife({ locale: i18n.currentLocale });
          pluginCommand({
            commandPath: _astCommands.path,
            commandType: _astCommands.commandType,
            data: commandModuleProps,
          });
        } else {
          const { pluginLife, pluginCommand } = require(`${ctx.pkgName}`);
          pluginLife({ locale: i18n.currentLocale });
          pluginCommand({
            commandPath: _astCommands.path,
            commandType: _astCommands.commandType,
            data: commandModuleProps,
          });
        }
      }
    } catch (error) {
      throw error;
    }
  }
  await next();
};

export default runCommand;
