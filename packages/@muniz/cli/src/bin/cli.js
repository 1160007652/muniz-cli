#!/usr/bin/env node

const CommandApp = require('./app');

const app = new CommandApp({ argv: process.argv.slice(2), i18n: '国际化', render: '命令行渲染库' });

app.use((ctx, next) => {
  console.log('解析-命令参数格式');
  next();
});

app.use((ctx, next) => {
  console.log('插件-命令 是否存在');
  next();
});

app.use((ctx, next) => {
  console.log('生成帮助文档');
  console.log(ctx);
  next();
});

// 启动
app.start();
