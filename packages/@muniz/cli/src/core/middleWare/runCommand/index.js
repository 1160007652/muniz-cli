import React from 'react';
import { Text } from 'ink';

/**
 * 执行 命令
 */
const runCommand = (ctx, next) => {
  const { commands, argv, render } = ctx;
  console.log(ctx);
  next();
};

export default runCommand;
