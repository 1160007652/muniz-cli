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
    _astCommands = astCommands.filter((item) => item.key === argv.command[1]);
  }

  if (_astCommands.length === 0) {
    render(<NotCommand {...ctx} isExistPlugin />);
  } else {
    const commandModule = require(`${ctx.pkgPath}/dist/command/${_astCommands[0].path}`).default;
    render(React.createElement(commandModule, { ...argv }));
  }

  next();
};

export default runCommand;
