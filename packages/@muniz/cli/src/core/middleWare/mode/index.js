import { default as pro } from './pro';
import { default as dev } from './dev';

/**
 * 开发模式命令
 */
const modePro = async (ctx, next) => {
  const { pkg, argv, render } = ctx;
  const { options } = argv;
  if ('mode' in argv.options) {
    const _mode = {
      dev,
      pro,
    };
    if (options.mode in _mode) {
      argv.input = argv.input.concat(argv.command);
      argv.command = [];
      await _mode[options.mode]({ argv, pkgPath: process.cwd() });
    } else {
      console.log('muniz 脚手架模式切换');
      console.log('支持 dev（开发模式）pro（生产模式）');
    }

    process.exit();
  } else {
    next();
  }
};

export default modePro;
