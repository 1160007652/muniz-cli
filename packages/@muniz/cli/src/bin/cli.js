#!/usr/bin/env node
'use strict';

import React from 'react';
import { render, Text } from 'ink';
import { CommandApp, formatArgv } from '../core/CommandApp';
// import { formatArgv } from '../core/middleWare/formatArgv';
import pkg from '../../package.json';

const commandApp = new CommandApp({ argv: process.argv.slice(2), pkg, i18n: '国际化', render });

// 使用格式化命令插件
commandApp.use(formatArgv);

commandApp.use((ctx, next) => {
  const _tempPkgPath = `@muniz/muniz-plugin-${ctx.argv[0]}`;

  try {
    const _tempPkgJsonPath = require.resolve(_tempPkgPath);
  } catch {
    ctx.render(<Text>插件不存在</Text>);
  }

  console.log(ctx.argv);

  next();
});

// 启动
commandApp.start();
