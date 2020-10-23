import React from 'react';
import { Version } from '@muniz/ink-ui';

/**
 * 显示帮助命令
 */
const versionCommand = (ctx, next) => {
  const { pkg, argv, render } = ctx;
  if (argv.options?.version) {
    render(<Version pkg={pkg} />);
    process.exit();
  }
  next();
};

export default versionCommand;
