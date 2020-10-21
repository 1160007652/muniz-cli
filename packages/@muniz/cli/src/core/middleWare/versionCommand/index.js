import React from 'react';
import { UI_Version } from '../../../command';

/**
 * 显示帮助命令
 */
const versionCommand = (ctx, next) => {
  const { pkg, argv, render } = ctx;
  if (argv.options?.version) {
    render(<UI_Version pkg={pkg} />);
    process.exit();
  }
  next();
};

export default versionCommand;
