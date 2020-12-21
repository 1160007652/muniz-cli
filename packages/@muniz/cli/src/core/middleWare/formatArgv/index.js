/**
 * 格式化 命令行 argv
 */

import cleanArgv from './cleanArgv';
const minimist = require('minimist');
/**
 * 中间价：清晰数据
 */
const formatArgv = async (ctx, next) => {
  const { argv } = ctx;
  ctx.argv = cleanArgv(minimist(argv));

  await next();
};

export default formatArgv;
