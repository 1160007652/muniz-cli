import { lowdbAction } from '../../lib/lowdb.js';
import i18n from '../../lib/i18n';
const execa = require('execa');
const os = require('os');
const ora = require('ora');

/**
 * @muniz
 * @type function
 * @description help_add_desc
 */
const Add = async ({ input }) => {
  if (input.length < 1) {
    console.log(i18n.getLocale('add_command_empty_tips'));
    process.exit();
  }
  const pluginCorrectList = []; // 正确的待安装插件列表
  const pluginFail = []; // 失败的插件列表， {tips: '这里存放了错误的原因提示'}
  const pluginSucced = []; // 成功的插件列表

  [...new Set(input)].forEach((item) => {
    let shortName = item.match(/.*?muniz-plugin-(.*?)$/);
    shortName = shortName?.length > 1 ? shortName[1] : '';
    if (!shortName) {
      pluginFail.push({ shortName, pkgName: item, tips: i18n.getLocale('add_command_no_plugin1') });
    } else {
      pluginCorrectList.push({ shortName, pkgName: item });
    }
  });

  const spinner = ora();

  spinner.start(i18n.getLocale('add_command_installing'));
  for (const { shortName, pkgName } of pluginCorrectList) {
    try {
      await execa.command(`npm install -g ${pkgName}`, { shell: true });
      // 向系统配置文件中，保存安装插件记录
      await lowdbAction.addPluginPkg({ shortName, pkgName });

      pluginSucced.push({ shortName, pkgName });

      // 在 MAC 系统中，检查自动执行事件
      (() => {
        if (os.type() === 'Darwin') {
          const { pluginLife } = require(`${pkgName}`);
          const pluginModule = pluginLife({ locale: i18n.currentLocale });
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
      })();
    } catch (e) {
      console.log(e);
      pluginFail.push({ shortName, pkgName, tips: i18n.getLocale('add_command_check_npm_tips') });
    }
  }

  spinner.succeed(i18n.getLocale('add_command_installed'));
  (pluginSucced.length > 0 || pluginFail.length > 0) && console.log('\n---------------------------------');

  pluginSucced.length > 0 && console.log(`\n- ${i18n.getLocale('add_command_plugin_success_list')}\n`);
  pluginSucced.forEach(({ pkgName, shortName }) => {
    console.log(i18n.getLocale('add_command_plugin_success_tips', { pkgName, shortName }));
  });

  pluginFail.length > 0 && console.log(`\n- ${i18n.getLocale('add_command_plugin_fail_list')}\n`);
  pluginFail.forEach(({ pkgName, tips }) => {
    console.log(i18n.getLocale('add_command_plugin_fail_tips', { pkgName, tips }));
  });
};

export default Add;
