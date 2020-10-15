/**
 * 格式化 命令行 argv
 */

import { cleanOptions } from '../../../lib/cleanOptions';

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
 */
const formatArgv = (ctx, next) => {
  const { argv } = ctx;

  const newArgv = {
    input: [],
    options: {},
  };

  argv.forEach((item) => {
    if (!/^\-{1,2}/.test(item)) {
      newArgv.input.push(item);
    } else {
      let temp = item.split('=');
      temp[0] = temp[0].replace(/^\-{1,2}/, '');
      temp[0] = temp[0].replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));
      newArgv.options[temp[0]] = temp[1];
    }
  });

  ctx.argv = newArgv;

  next();
};

export default formatArgv;
