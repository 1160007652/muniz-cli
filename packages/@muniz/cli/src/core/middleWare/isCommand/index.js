import React from 'react';
import { Text } from 'ink';

/**
 * 是否是内置命令
 */
const isCommand = (ctx, next) => {
  const { commands, argv, render } = ctx;

  // 如果 argv.input > 0, 表示输入了执行命令， 开始执行输入的命令
  if (argv.input.length > 0) {
    // 如果输入的命令是 内置命令， 那么执行内置框架命令
    if (commands.includes(argv.input[0])) {
      ctx.pkgName = '@muniz/cli';
      ctx.pkgPath = __filename.replace(new RegExp('(@muniz/cli)/.*$', 'ig'), (_, c) => c);
      ctx.pkg = require(`${ctx.pkgPath}/package.json`);
    } else {
      try {
        ctx.pkgName = `@muniz/muniz-plugin-${argv.input[0]}`;
        const _tempPkgPath = require.resolve(ctx.pkgName);
        ctx.pkgPath = _tempPkgPath.replace(new RegExp(`(${ctx.pkgName})/.*$`, 'ig'), (_, c) => c);
        ctx.pkg = require(`${ctx.pkgPath}/package.json`);
      } catch {
        render(<Text>打印 执行命令不存在</Text>);

        /**
         * 可以在这里做 命令 推荐
         */
        process.exit();
      }
    }

    next();
  } else {
    // 如果 argv.input === 0, 没有输入执行命令， 这种情况 打印“帮助”命令
    render(<Text>打印主框架帮助命令</Text>);
    process.exit();
  }
};

export default isCommand;
