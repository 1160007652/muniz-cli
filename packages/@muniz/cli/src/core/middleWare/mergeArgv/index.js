/**
 * 合并 argv 中的 options 对象数据, 实现如下几点：
 * - 将（alias）别名转化为全量的名称；
 * - 转化options类型(type)；
 * - 赋值默认值， 将给定的参数进行默认值赋值；
 *
 */
const mergeArgv = (ctx, next) => {
  const { pkgName, argv, env } = ctx;
  let newOptions = {};

  if (env.command === 'plugin') {
    ctx.currentModule = require(pkgName).default;
  }

  const { cliConfig, i18nLocales } = ctx.currentModule;

  // console.log(cliConfig);

  Object.keys(argv.options).forEach((item) => {
    // 不复制 没有被用户添加的选项参数-数据
    if (!['function', 'undefined'].includes(typeof argv.options[item])) {
      newOptions[item] = argv.options[item];
    }
  });

  argv.options = newOptions;

  next();
};

export default mergeArgv;
