import { lowdbAction } from '../../lib/lowdb.js';

const execa = require('execa');
const ora = require('ora');

/**
 * @muniz
 * @type function
 * @description help_remove_desc
 */
const Remove = async ({ input }) => {
  if (!input.join('').trim()) {
    console.log('请输入要删除的插件');
  }

  const spinner = ora();

  const pkgName = await lowdbAction.getPluginPkgName({ shortName: input.join('').trim() });
  spinner.start('正在删除中，请稍等片刻');

  if (pkgName) {
    await execa
      .command(`npm uninstall -g ${pkgName}`)
      .then(async () => {
        // 向系统配置文件中，删除安装插件记录
        await lowdbAction.removePluginPkg({ pkgName });
        spinner.fail('删除成功');
      })
      .catch(() => {
        spinner.fail('删除失败，请执行 muniz list 命令，查看是否存在该插件！');
      });
  } else {
    spinner.fail('删除失败，请执行 muniz list 命令，查看是否存在该插件！');
  }
};

export default Remove;
