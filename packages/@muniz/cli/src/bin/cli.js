#!/usr/bin/env node
'use strict';

import { CommandApp } from '../core/CommandApp';

const commandApp = new CommandApp({ argv: process.argv.slice(2), i18n: '国际化', render: '命令行渲染库' });

commandApp.use((ctx, next) => {
  console.log('解析-命令参数格式');
  next();
});

commandApp.use((ctx, next) => {
  console.log('插件-命令 是否存在');
  next();
});

commandApp.use((ctx, next) => {
  console.log('生成帮助文档');
  console.log(ctx);
  next();
});

// 启动
commandApp.start();
