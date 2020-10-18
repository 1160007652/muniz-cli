/**
 * 格式化 命令行 argv
 */

// import { cleanOptions } from '../../../lib/cleanOptions';
import { default as cleanArgv } from './cleanArgv';

/**
 * 中间价：清晰数据
 */
const formatArgv = (ctx, next) => {
  const { argv } = ctx;

  ctx.argv = cleanArgv(argv);

  next();
};

export default formatArgv;
