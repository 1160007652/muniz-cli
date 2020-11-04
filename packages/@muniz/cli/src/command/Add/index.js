import { lowdbAction } from '../../lib/lowdb.js';
const execa = require('execa');
const os = require('os');
const ora = require('ora');

/**
 * @muniz
 * @type function
 * @description help_add_desc
 */
const Add = ({ input }) => {
  const spinner = ora('安装中，等待...');
  if (input.length < 0) {
    console.log('不能为空');
  }
  const plugins = input.map((item) => {
    let shortName = item.match(/.*?muniz-plugin-(.*?)$/);
    shortName = shortName?.length > 1 ? shortName[1] : '';
    if (!shortName) {
      console.log(`输入的 “${item}” 不是「 Muniz 」 脚手架插件`);
      process.exit();
    } else {
      return { shortName, pkgName: item };
    }
  });
  const pluginNames = plugins.map((item) => item.pkgName).join(' ');
  spinner.start();
  execa
    .command(`npm install -g ${pluginNames}`)
    .then(() => {
      // 向系统配置文件中，保存安装插件记录
      plugins.forEach((item) => {
        lowdbAction.addPluginPkg(item);
      });

      // 只在 MAC 系统下 启动（插件立即执行）功能
      if (os.type === 'Darwin') {
        const pluginModule = require(pkgList.pkgName).default();

        if (pluginModule.isStart) {
          //生成自启动脚本
          const osascriptContent = `
            tell application "Terminal"
              activate
              do script "muniz ${pkgList.shortName}"
            end tell
          `;
          execa.commandSync(`osascript -e '${osascriptContent}'`, {
            shell: true,
          });
        }
      }
      spinner.succeed('安装成功');
    })
    .catch((_) => {
      spinner.fail('安装失败, 请检查 npm 镜像，是否存在本次安装的插件包！');
    })
    .finally(() => {
      setTimeout(() => {
        process.exit();
      }, 100);
    });
};

export default Add;
