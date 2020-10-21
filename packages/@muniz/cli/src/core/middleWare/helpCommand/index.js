import React from 'react';
import { Text } from 'ink';

/**
 * 使用帮助命令
 */
const helpCommand = (ctx, next) => {
  const { commands, argv, render } = ctx;

  if (argv.options?.help) {
    console.log('显示 使用帮助');
    process.exit();
  }
  next();
};

export default helpCommand;
