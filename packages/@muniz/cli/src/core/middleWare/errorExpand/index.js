import React from 'react';
import { NotCommand } from '@muniz/ink-ui';
import { lowdbAction } from '../../../lib/lowdb.js';
const didyoumean = require('didyoumean');
const MunizConfig = require('../../../configs/system.json');
import ErrorExceptionType from '../../../configs/errorExceptionType';

didyoumean.threshold = 0.8;
/**
 * 中间件 => 统一捕捉错误信息
 */
const errorExpand = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    const { render, astCommands, argv } = ctx;
    const errorString = error.message;

    if (errorString === ErrorExceptionType.CLI_NOT_COMMAND) {
      ctx.pkgPath = '';
      ctx.pkg = {};

      const pluginNameList = lowdbAction.getPluginPkgList();
      const commandList = pluginNameList
        .map((item) => {
          return {
            key: item[1],
          };
        })
        .concat(astCommands);

      render(
        <NotCommand
          type="cli"
          {...ctx}
          recommand={didyoumean(argv.command[0], commandList, 'key')}
          locale={MunizConfig.languageLocale}
        />,
      );
      process.exit();
    }

    if (errorString === ErrorExceptionType.PLUGIN_NOT_COMMAND) {
      ctx.pkgPath = '';
      ctx.pkg = {};

      render(
        <NotCommand
          type="cli-plugin"
          {...ctx}
          recommand={didyoumean(argv.command[1], astCommands, 'key')}
          locale={MunizConfig.languageLocale}
        />,
      );
      process.exit();
    }

    if (process.env.CLI_ENV === 'development') {
      console.log(error);
    } else {
      console.log(error.message);
    }
  }
};

export default errorExpand;
