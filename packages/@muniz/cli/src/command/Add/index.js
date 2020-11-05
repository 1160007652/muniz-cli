import { lowdbAction } from '../../lib/lowdb.js';

const MunizConfig = require('../../configs/system.json');
const execa = require('execa');
const os = require('os');
const ora = require('ora');

/**
 * @muniz
 * @type function
 * @description help_add_desc
 */
const Add = async ({ input }) => {
  if (input.length < 0) {
    console.log('请输入要安装的插件');
  }
  const pluginCorrectList = []; // 正确的待安装插件列表
  const pluginFail = []; // 失败的插件列表， {tips: '这里存放了错误的原因提示'}
  const pluginSucced = []; // 成功的插件列表

  [...new Set(input)].forEach((item) => {
    let shortName = item.match(/.*?muniz-plugin-(.*?)$/);
    shortName = shortName?.length > 1 ? shortName[1] : '';
    if (!shortName) {
      pluginFail.push({ shortName, pkgName: item, tips: '不是「 Muniz CLI 」 脚手架插件' });
    } else {
      pluginCorrectList.push({ shortName, pkgName: item });
    }
  });

  const spinner = ora();

  spinner.start('正在安装中，请稍等片刻');
  for (const { shortName, pkgName } of pluginCorrectList) {
    await execa
      .command(`npm install -g ${pkgName}`)
      .then(() => {
        // 向系统配置文件中，保存安装插件记录
        lowdbAction.addPluginPkg({ shortName, pkgName });
        pluginSucced.push({ shortName, pkgName });

        // 在 MAC 系统中，检查自动执行事件
        if (os.type() === 'Darwin') {
          const pluginModule = require(pkgName).default({ locale: MunizConfig.languageLocale });
          if (pluginModule?.isStart) {
            const osascriptContent = `
                  tell application "Terminal"
                    activate
                    do script "muniz ${shortName}"
                  end tell
                `;
            execa.commandSync(`osascript -e '${osascriptContent}'`, {
              shell: true,
            });
          }
        }
      })
      .catch(() => {
        pluginFail.push({ shortName, pkgName, tips: '请检查 npm 镜像，是否存在该插件包！' });
      });
  }

  spinner.succeed('安装结束');
  console.log('---------------------------------\n');

  pluginSucced.length > 0 && console.log('- 列表·安装成功\n');
  pluginSucced.forEach((_plugin) => {
    console.log(`【${_plugin.pkgName}】插件，使用命令 muniz ${_plugin.shortName}`);
  });

  pluginFail.length > 0 && console.log('\n- 列表·安装失败\n');
  pluginFail.forEach((_plugin) => {
    console.log(`【${_plugin.pkgName}】原因：${_plugin.tips}`);
  });
};

export default Add;
