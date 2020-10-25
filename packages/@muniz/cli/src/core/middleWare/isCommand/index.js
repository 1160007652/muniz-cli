import React from 'react';

import { NotCommand } from '@muniz/ink-ui';
import { generateCommand } from '@muniz/servers';

/**
 * 是否是内置命令
 */
const isCommand = async (ctx, next) => {
  const { argv, render } = ctx;
  // 初始化执行内置框架命令
  ctx.pkgName = '@muniz/cli';
  ctx.pkgPath = __filename.replace(new RegExp('(@muniz/cli)/.*$', 'ig'), (_, c) => c);
  ctx.pkg = require(`${ctx.pkgPath}/package.json`);

  // 读取命令AST信息
  ctx.astCommands = await generateCommand(`${ctx.pkgPath}/src/command`, `${ctx.pkgPath}/src/command`);

  // 如果 argv.input > 0, 表示输入了执行命令， 开始执行输入的命令
  if (argv.command.length > 0) {
    // 检查是否是内置的CLI 命令
    const isCliCommand = ctx.astCommands.some((item) => item.key === argv.command[0]);

    // 执行 非内置命令 =》 插件命令
    if (!isCliCommand) {
      ctx.env.command = 'plugin'; // 当前 运行环境 变更为 插件， 默认是 cli 主控制器环境

      try {
        ctx.pkgName = `@muniz/muniz-plugin-${argv.command[0]}`;
        const _tempPkgPath = require.resolve(ctx.pkgName);
        ctx.pkgPath = _tempPkgPath.replace(new RegExp(`(${ctx.pkgName})/.*$`, 'ig'), (_, c) => c);
        ctx.pkg = require(`${ctx.pkgPath}/package.json`);
        // 读取命令AST信息
        ctx.astCommands = await generateCommand(`${ctx.pkgPath}/src/command`, `${ctx.pkgPath}/src/command`);
        // 读取插件配置信息
        const pluginConfig = require(`${ctx.pkgPath}/dist/index.js`).default(1);
        if (argv.command.length < 2) {
          if (pluginConfig?.defaultCommand && !['', 'function', 'undefined'].includes(pluginConfig?.defaultCommand)) {
            // argv.command.push(pluginConfig.defaultCommand);
          } else {
            argv.options['help'] = true;
          }
        }
      } catch {
        ctx.pkgName = `@muniz/muniz-plugin-${argv.command[0]}`;
        ctx.pkgPath = '';
        ctx.pkg = {};
        render(<NotCommand {...ctx} />);

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
    if (Object.keys(argv.options).length >= 0 && !(argv.options?.version || argv.options?.v)) {
      argv.options['help'] = true;
    }
    next();
  }
};

export default isCommand;
