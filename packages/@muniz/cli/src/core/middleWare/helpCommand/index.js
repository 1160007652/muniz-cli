import React from 'react';
import { Text } from 'ink';
import { UI_Help } from '../../../command';

import { generateCommand } from '@muniz/servers';

/**
 * 使用帮助命令
 */
const helpCommand = async (ctx, next) => {
  const { commands, argv, render, pkgPath } = ctx;

  if (argv.options?.help) {
    // console.log(ctx);
    let result = await generateCommand(`${pkgPath}/src/command`, `${pkgPath}/src/command`);

    if ([0, 1].includes(argv.input.length)) {
      render(<UI_Help data={result} show="command" usage={`$ muniz <command> [options]`} />);
    }

    if (argv.input.length === 2) {
      result = result.filter((item) => item.key === argv.input[1])[0];
      render(<UI_Help data={result} show="options" usage={`$ muniz ${argv.input[1]} [options]`} />);
    }

    // console.log('显示 使用帮助\n', result.options);

    process.exit();
  }
  next();
};

export default helpCommand;
