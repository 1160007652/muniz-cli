import pro from './pro';
import dev from './dev';
import i18n from '../../../lib/i18n';

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
      let cwdPath = process.cwd();
      if (process.env.CLI_ENV === 'development') {
        cwdPath += '/src';
      } else {
        cwdPath += '/dist';
      }
      await _mode[options.mode]({ argv, pkgPath: cwdPath });
    } else {
      console.log(i18n.getLocale('mode_switch_tips'));
      console.log(i18n.getLocale('mode_switch_supported'));
    }

    process.exit();
  } else {
    await next();
  }
};

export default modePro;
