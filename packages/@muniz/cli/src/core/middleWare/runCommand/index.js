import React from 'react';
import { default as cliCommand } from '../../../command';
import { NotCommand } from '@muniz/ink-ui';

/**
 * 执行 命令
 */
const runCommand = (ctx, next) => {
  const { commands, argv, render, currentModule, env } = ctx;
  const { cliConfig, i18nLocales } = currentModule;
  const { input } = argv;

  let command = null;

  if (env.command === 'cli') {
    command = cliCommand.command;
  } else {
    command = currentModule.command;
  }

  const commandComponent = command[input[1]] || command.default;

  if (env.command === 'plugin') {
    if (!command[argv.input[argv.input.length - 1]] && !commandComponent) {
      render(<NotCommand {...ctx} />);
      process.exit();
    }
  }

  render(React.createElement(commandComponent, { ...argv }));

  next();
};

export default runCommand;
