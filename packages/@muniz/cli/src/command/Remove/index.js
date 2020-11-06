import { lowdbAction } from '../../lib/lowdb.js';
import i18n from '../../lib/i18n';
const execa = require('execa');
const ora = require('ora');

/**
 * @muniz
 * @type function
 * @description help_remove_desc
 */
const Remove = async ({ input }) => {
  if (!input.join('').trim()) {
    console.log(i18n.getLocale('remove_command_empty_tips'));
    process.exit();
  }

  const spinner = ora();

  const pkgName = await lowdbAction.getPluginPkgName({ shortName: input.join('').trim() });
  spinner.start(i18n.getLocale('remove_command_removeing'));

  if (pkgName) {
    await execa
      .command(`npm uninstall -g ${pkgName}`)
      .then(async () => {
        // 向系统配置文件中，删除安装插件记录
        await lowdbAction.removePluginPkg({ pkgName });
        spinner.fail(i18n.getLocale('remove_command_success'));
      })
      .catch(() => {
        spinner.fail(i18n.getLocale('remove_command_fail'));
      });
  } else {
    spinner.fail(i18n.getLocale('remove_command_fail'));
  }
};

export default Remove;
