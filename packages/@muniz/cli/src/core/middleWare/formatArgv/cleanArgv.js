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
  argv.forEach((item, index) => {
    if (!/^\-{1,2}/.test(item)) {
      if (index < 2) {
        newArgv.command.push(item);
      } else {
        newArgv.input.push(item);
      }
    } else {
      let temp = item.split('=');
      temp[0] = temp[0].replace(/^\-{1,2}/, '');
      temp[0] = temp[0].replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));

      if (['help', 'version', 'h', 'v'].includes(temp[0])) {
        newArgv.options[temp[0]] = true;
      } else {
        newArgv.options[temp[0]] = temp[1];
      }
    }
  });

  return newArgv;
}
