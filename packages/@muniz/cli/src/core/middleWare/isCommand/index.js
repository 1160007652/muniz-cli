const path = require('path');
const fs = require('fs-extra');
import { InkUI, React } from '@muniz/common';
import { generateCommand } from '@muniz/servers';
const { NotCommand } = InkUI;

const MunizConfig = require(path.resolve(__filename, '../../../../configs/system.json'));
/**
 * 是否是内置命令
 */
const isCommand = async (ctx, next) => {
  const { argv, render } = ctx;
  // 初始化执行内置框架命令
  ctx.pkgName = '@muniz/cli';
  ctx.pkgPath = __filename.replace(new RegExp('@muniz(.*?)$', 'ig'), (_, c) => path.join(ctx.pkgName));
  ctx.pkg = require(path.join(ctx.pkgPath, '/package.json'));

  // 读取命令AST信息
  if (MunizConfig.MUNIZ_CLI_DEBUG) {
    ctx.astCommands = await generateCommand(
      path.join(ctx.pkgPath, '/src/command'),
      path.join(ctx.pkgPath, '/src/command'),
    );
  } else {
    ctx.astCommands = fs.readJsonSync(path.join(ctx.pkgPath, '/dist/configs/commandHelp.json'));
  }

  // 如果 argv.input > 0, 表示输入了执行命令， 开始执行输入的命令
  if (argv.command.length > 0) {
    // 设置当前的开发环境, 是什么模式 由 用户的 命令行输入决定
    if ('mode' in argv.options) {
      delete argv.options.mode;
    }

    // 检查是否是内置的CLI 命令
    const isCliCommand = ctx.astCommands.some((item) => item.key === argv.command[0]);

    // 执行 非内置命令 =》 插件命令
    if (!isCliCommand) {
      ctx.env.command = 'plugin'; // 当前 运行环境 变更为 插件， 默认是 cli 主控制器环境

      try {
        /**
         * 这一块的插件名称，要根据 一定的规则去执行
         *
         * 在创建插件时，和安装插件时，要与 脚手架提供的插件 短命令 指令名称 进行比较，不允许使用 脚手架保留昵称；
         *
         * 使用插件时，需要进行 数据库查询，查找已安装的插件， 根据唯一的短指令昵称去匹配 全量包名；
         * 并且外部开发的插件不支持 scope 形式， 如 scope/muniz-plugin-xxx
         * 只支持外部 muniz-plugin-xxx 插件形式
         */
        ctx.pkgName = `@muniz/muniz-plugin-${argv.command[0]}`;
        const _tempPkgPath = require.resolve(ctx.pkgName);

        ctx.pkgPath = _tempPkgPath.replace(new RegExp(`${path.join(ctx.pkgName)}(.*?)$`, 'ig'), (_, c) => ctx.pkgName);

        console.log(ctx.pkgPath);
        ctx.pkg = require(path.join(ctx.pkgPath, '/package.json'));

        // 读取命令AST信息
        if (MunizConfig.MUNIZ_CLI_DEBUG) {
          ctx.astCommands = await generateCommand(
            path.join(ctx.pkgPath, '/src/command'),
            path.join(ctx.pkgPath, '/src/command'),
          );
        } else {
          ctx.astCommands = fs.readJsonSync(path.join(ctx.pkgPath, '/dist/configs/commandHelp.json'));
        }

        // 读取插件配置信息
        const pluginConfig = require(path.join(ctx.pkgPath, '/dist/index.js')).default(1);
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
    } else {
      if (argv.command.length > 1) {
        argv.input.unshift(argv.command.pop());
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
    if (Object.keys(argv.options).length >= 0 && !(argv.options?.version || argv.options?.v || argv.options?.mode)) {
      argv.options['help'] = true;
    }
    next();
  }
};

export default isCommand;
