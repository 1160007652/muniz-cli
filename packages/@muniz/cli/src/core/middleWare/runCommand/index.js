const path = require('path');
import React from 'react';
import { NotCommand } from '@muniz/ink-ui';

/**
 * 执行 命令
 */
const runCommand = async (ctx, next) => {
  const { argv, astCommands, render, env } = ctx;

  let _astCommands = [];
  if (env.command === 'cli') {
    _astCommands = astCommands.filter((item) => item.key === argv.command[0]);
  } else {
    const pluginConfig = require(path.join(ctx.pkgPath, '/dist/index.js')).default(1);
    if (argv.command.length < 2) {
      if (pluginConfig?.defaultCommand && !['', 'function', 'undefined'].includes(pluginConfig?.defaultCommand)) {
        _astCommands = astCommands.filter((item) => item.key === pluginConfig.defaultCommand);
      }
    } else {
      _astCommands = astCommands.filter((item) => item.key === argv.command[1]);
    }
  }

  if (_astCommands.length === 0) {
    render(<NotCommand {...ctx} isExistPlugin />);
  } else {
    const commandModuleProps = {
      ...argv.options,
      input: argv.input,
    };
    if (env.command === 'cli') {
      const commandModule = require(`${ctx.pkgPath}/dist/command/${_astCommands[0].path}`).default;
      render(React.createElement(commandModule, commandModuleProps));
    } else {
      const { pluginCommand } = require(`${ctx.pkgName}`);
      pluginCommand({ commandPath: _astCommands[0].path, data: commandModuleProps });
    }
  }

  next();
};

export default runCommand;
