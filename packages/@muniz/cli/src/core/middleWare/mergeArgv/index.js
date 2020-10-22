import { generateCommand } from '@muniz/servers';

/**
 * 合并 argv 中的 options 对象数据, 实现如下几点：
 * - 将（alias）别名转化为全量的名称；
 * - 转化options类型(type)；
 * - 赋值默认值， 将给定的参数进行默认值赋值；
 *
 */
const mergeArgv = async (ctx, next) => {
  const { pkgName, argv, env, pkgPath } = ctx;
  let newOptions = {};

  if (env.command === 'plugin') {
    ctx.currentModule = require(pkgName).default;
  }

  const { cliConfig, i18nLocales } = ctx.currentModule;

  let result = await generateCommand(`${pkgPath}/src/command`, `${pkgPath}/src/command`);

  if (argv.input.length < 2) {
    // argv.input.push(argv.input[0]);
    result = result.filter((item) => item.key === argv.input[0])[0];
  } else {
    result = result.filter((item) => item.key === argv.input[1])[0];
  }

  if (Object.keys(argv.options).length > 0) {
    Object.keys(argv.options).forEach((item) => {
      // 合并 --help, -h 参数
      if (['h', 'help'].includes(item)) {
        newOptions['help'] = true;
      }
      // 合并 --version, -v 参数
      if (['v', 'version'].includes(item)) {
        newOptions['version'] = true;
      }

      let aliasName = item;
      // 整合 短名称参数，如果有该参数，未设值 那么 取预设的默认值
      result.options.forEach((_options) => {
        if ([_options.alias, _options.key].includes(item)) {
          newOptions[_options.key] = argv.options[item] || _options.default;
          aliasName = _options.key;
        }
      });

      // 不复制 没有被用户添加的选项参数-数据
      if (!['function', 'undefined'].includes(typeof argv.options[item])) {
        if (!(aliasName in newOptions)) {
          newOptions[item] = argv.options[item];
        }
      }
    });
  } else {
    // 如果没有参数, 那么全部取预设的数据
    result.options.forEach((_options) => {
      newOptions[_options.key] = _options.default;
    });
  }

  argv.options = newOptions;

  next();
};

export default mergeArgv;
