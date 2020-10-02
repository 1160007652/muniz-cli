/**
 * 根据 flags 生成, help 帮助文档 options 描述信息
 * @param {object} _options meow flags 字段属性数据，也是 config 中的 cliOptions数据
 */
export const cleanOptions = (_options) => {
  const cliOptions = Object.keys(_options).map((item) => {
    let command = item.replace(/([A-Z])/g, (_, c) => (c ? `-${c.toLocaleLowerCase()}` : ''));

    command = `--${command}`;
    if (_options[item]?.alias) {
      command = `${command}, -${_options[item]?.alias}`;
    }

    return {
      command,
      desc: _options[item]?.desc || '',
      default: _options[item]?.default || '',
    };
  });
  return cliOptions;
};
