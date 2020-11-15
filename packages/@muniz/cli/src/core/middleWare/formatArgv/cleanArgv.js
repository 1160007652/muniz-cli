/**
 * 输入格式，如下
 *
 * [create, -a, --project-name=test]
 *
 * 输出 清洗过的 argv，格式如下
 *
 * {
 *    input: [create],
 *    options: { a: true, projectName: test },
 * }
 *
 * @param {array} argv 命令行参数
 */
export default function cleanArgv(argv) {
  const newArgv = {
    command: [],
    input: [],
    options: {},
  };

  argv._.forEach((item, index) => {
    if (index < 2) {
      newArgv.command.push(item);
    } else {
      newArgv.input.push(item);
    }
  });

  Object.keys(argv).forEach((item) => {
    if (item !== '_') {
      const tempKey = item.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));
      if (['help', 'version', 'h', 'v'].includes(tempKey)) {
        newArgv.options[tempKey] = true;
      } else {
        newArgv.options[tempKey] = argv[item];
      }
    }
  });

  return newArgv;
}
