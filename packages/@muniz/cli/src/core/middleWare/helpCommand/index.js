import React from 'react';
import { Text } from 'ink';

import { commandjx } from '@muniz/servers';

/**
 * 使用帮助命令
 */
const helpCommand = (ctx, next) => {
  const { commands, argv, render, pkgPath } = ctx;

  if (argv.options?.help) {
    // console.log(ctx);
    commandjx(`${pkgPath}/src/command/App/index.js`);
    console.log('显示 使用帮助');
    process.exit();
  }
  next();
};

export default helpCommand;
