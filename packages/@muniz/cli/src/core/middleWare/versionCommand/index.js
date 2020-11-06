import React from 'react';
import { Version } from '@muniz/ink-ui';
import i18n from '../../../lib/i18n';

/**
 * 显示帮助命令
 */
const versionCommand = (ctx, next) => {
  const { pkg, argv, render } = ctx;
  if (argv.options?.version) {
    render(<Version pkg={pkg} locale={i18n.currentLocale} />);
    process.exit();
  } else {
    next();
  }
};

export default versionCommand;
