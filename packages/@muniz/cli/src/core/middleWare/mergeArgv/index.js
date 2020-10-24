/**
 * 合并 argv 中的 options 对象数据, 实现如下几点：
 * - 将（alias）别名转化为全量的名称；
 * - 转化options类型(type)；
 * - 赋值默认值， 将给定的参数进行默认值赋值；
 */
const mergeArgv = async (ctx, next) => {
  const { argv, astCommands, env } = ctx;
  let newOptions = {};
  let _astCommands = [];
  if (env.command === 'cli') {
    _astCommands = astCommands.filter((item) => item.key === argv.command[0]);
  } else {
    _astCommands = astCommands.filter((item) => item.key === argv.command[1]);
  }

  if (Object.keys(argv.options).length > 0) {
    Object.keys(argv.options).forEach((item) => {
      let aliasName = item;

      // 合并 --help, -h 参数
      if (['h', 'help'].includes(item)) {
        newOptions['help'] = true;
        aliasName = 'help';
      }
      // 合并 --version, -v 参数
      if (['v', 'version'].includes(item)) {
        newOptions['version'] = true;
        aliasName = 'version';
      }

      // 整合 短名称参数，如果有该参数，未设值 那么 取预设的默认值
      _astCommands[0]?.options?.forEach((_options) => {
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
    _astCommands[0]?.options?.forEach((_options) => {
      if (_options?.key) {
        newOptions[_options.key] = _options.default;
      }
    });
  }

  argv.options = newOptions;

  next();
};

export default mergeArgv;
