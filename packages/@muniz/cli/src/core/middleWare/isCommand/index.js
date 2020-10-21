import React from 'react';

import { UI_NotCommand } from '../../../command';

/**
 * 是否是内置命令
 */
const isCommand = (ctx, next) => {
  const { commands, argv, render } = ctx;

  // 初始化执行内置框架命令
  ctx.pkgName = '@muniz/cli';
  ctx.pkgPath = __filename.replace(new RegExp('(@muniz/cli)/.*$', 'ig'), (_, c) => c);
  ctx.pkg = require(`${ctx.pkgPath}/package.json`);

  // 如果 argv.input > 0, 表示输入了执行命令， 开始执行输入的命令
  if (argv.input.length > 0) {
    // 执行 非内置命令 =》 插件命令
    if (!commands.includes(argv.input[0])) {
      ctx.env.command = 'plugin'; // 当前 运行环境 变更为 插件， 默认是 cli 主控制器环境
      try {
        ctx.pkgName = `@muniz/muniz-plugin-${argv.input[0]}`;
        const _tempPkgPath = require.resolve(ctx.pkgName);
        ctx.pkgPath = _tempPkgPath.replace(new RegExp(`(${ctx.pkgName})/.*$`, 'ig'), (_, c) => c);
        ctx.pkg = require(`${ctx.pkgPath}/package.json`);
      } catch {
        ctx.pkgName = `@muniz/muniz-plugin-${argv.input[0]}`;
        ctx.pkgPath = '';
        ctx.pkg = {};

        render(<UI_NotCommand {...ctx} />);

        process.exit();
      }
    }

    next();
  } else {
    /**
     *
     * 如果 argv.input === 0, 且 argv.options === 0 时, 置入 argv.options.help = true , 走 打印中间件 显示“帮助”命令
     *
     * 如果是 --version，-V 参数，放行 next()
     *
     */

    if (Object.keys(argv.options).length >= 0 && !argv.options?.version) {
      argv.options['help'] = true;
    }

    next();
  }
};

export default isCommand;
