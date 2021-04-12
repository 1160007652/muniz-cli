const path = require('path');
const fs = require('fs-extra');
const MunizConfig = require('../../../configs/system.json');
import { lowdbAction } from '../../../lib/lowdb.js';
import i18nCommand from '../../../lib/i18nCommand';
import ErrorExceptionType from '../../../configs/errorExceptionType';

/**
 * 是否是内置命令
 */
const isCommand = async (ctx, next) => {
  const { argv } = ctx;
  // 初始化执行内置框架命令
  ctx.pkgName = '@muniz/cli';

  ctx.pkgPath = __filename.replace(new RegExp('@muniz(.*?)$', 'ig'), (_, c) => path.join(ctx.pkgName));

  if (process.env.CLI_ENV === 'development') {
    ctx.pkgPath = path.join(ctx.pkgPath, '/src');

    const _astCommands = await i18nCommand({ pkgPath: ctx.pkgPath });
    ctx.astCommands = _astCommands[MunizConfig.languageLocale];
  } else {
    ctx.pkgPath = path.join(ctx.pkgPath, '/dist');
    ctx.astCommands = fs.readJsonSync(path.join(ctx.pkgPath, '/configs/commandHelp.json'))[MunizConfig.languageLocale];
  }

  ctx.pkg = require(path.join(ctx.pkgPath, '../package.json'));

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

      /**
       * 这一块的插件名称，要根据 一定的规则去执行
       *
       * 在创建插件时，和安装插件时，要与 脚手架提供的插件 短命令 指令名称 进行比较，不允许使用 脚手架保留昵称；
       *
       * 使用插件时，需要进行 数据库查询，查找已安装的插件， 根据唯一的短指令昵称去匹配 全量包名；
       *
       */

      // 如果不是插件开发状态，获取当前执行命令对应的 “插件-包名称”
      if (process.env.EXTERNAL_PLUGIN_ENV !== 'development') {
        ctx.pkgName = await lowdbAction.getPluginPkgName({ shortName: argv.command[0] });
      }

      /**
       * 如果插件状态设置了 EXTERNAL_PLUGIN_ENV === development (表示，在外置的项目中进行开发，非当前项目)
       *
       * 说明 pkgPath 路径为当前执行命令所在的路径
       *
       * EXTERNAL_PLUGIN_ENV === production (表示 内在项目、或生产环境中，直接通过 包名进行加载获取路径)，
       * 巧妙的使用 require.resolve（）方法, 判断是否存在插件包，由近到远，从本地node_modules到全局node_modules进行查找
       */
      if (process.env.EXTERNAL_PLUGIN_ENV === 'development') {
        ctx.pkgPath = process.cwd();
      } else {
        try {
          const _tempPkgPath = require.resolve(ctx.pkgName);
          ctx.pkgPath = _tempPkgPath.replace(
            new RegExp(`${path.join(ctx.pkgName)}(.*?)$`, 'ig'),
            (_, c) => ctx.pkgName,
          );
        } catch {
          // 检查到插件不存在，提示
          throw new Error(ErrorExceptionType.CLI_NOT_COMMAND);
        }
      }

      if (process.env.CLI_ENV === 'development') {
        ctx.pkgPath = path.join(ctx.pkgPath, '/src');

        const _astCommands = await i18nCommand({ pkgPath: ctx.pkgPath });
        ctx.astCommands = _astCommands[MunizConfig.languageLocale];
      } else {
        ctx.pkgPath = path.join(ctx.pkgPath, '/dist');
        ctx.astCommands = fs.readJsonSync(path.join(ctx.pkgPath, '/configs/commandHelp.json'))[
          MunizConfig.languageLocale
        ];
      }

      ctx.pkg = require(path.resolve(ctx.pkgPath, '../package.json'));

      // 如果没有属性，打印 帮助文档
      if (argv.command.length < 2 && Object.keys(argv.options).length === 0) {
        argv.options['help'] = true;
      }
    } else {
      if (argv.command.length > 1) {
        argv.input.unshift(argv.command.pop());
      }
    }
    await next();
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
    await next();
  }
};

export default isCommand;
