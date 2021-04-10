const path = require('path');
const inquirer = require('inquirer');
const DataSource = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
import i18n from '../lib/i18n';
const adapter = new FileSync(path.resolve(__dirname, '../configs/system.json'));

const lowdb = DataSource(adapter);

// 默认脚手架 配置数据
const defaultSystemData = {
  MUNIZ_CLI_DEBUG: false,
  MUNIZ_PLUGIN_DEV: false,
  plugins: [],
};

lowdb.defaults(defaultSystemData).write();

const lowdbAction = {
  /**
   *
   * @param {obejct} param
   * @param {string} param.shortName 插件短名称，执行命令 取自 [scope]/muniz-plugin-(.*?) 匹配
   *
   */
  async getPluginPkgName({ shortName }) {
    const pkgNameList = lowdb
      .get('plugins')
      .filter({ shortName })
      .map((item) => {
        return {
          value: item.pkgName,
          ...item,
        };
      })
      .value();

    // 如果 = 0 表示 没有这个 插件
    if (pkgNameList.length === 0) {
      return '';
    }
    // 如果 = 1 表示 只安装了 一个 插件
    if (pkgNameList.length === 1) {
      return pkgNameList[0].pkgName;
    }
    // 如果 > 1 表示 只安装了 多个 插件, 需要用户进行交互选择
    if (pkgNameList.length > 1) {
      // 非react 交互
      const promptList = [
        {
          type: 'list',
          message: i18n.getLocale('run_command_select_tips'),
          name: 'pkgName',
          default: '',
          choices: pkgNameList,
        },
      ];

      const answers = await inquirer.prompt(promptList);
      /** 清空 */
      console.clear();
      return answers.pkgName;
    }
  },
  /**
   *
   * @param {obejct} param
   * @param {string} param.shortName 插件短名称，执行命令 取自 [scope]/muniz-plugin-(.*?) 匹配
   * @param {string} param.pkgName 插件包名称，如 [scope]/muniz-plugin-xxx
   */
  addPluginPkg({ shortName, pkgName }) {
    // 先根据 全量 pkg 包名删除
    lowdb.get('plugins').remove({ pkgName: pkgName }).write();
    // 删除完，再进行安装
    lowdb.get('plugins').push({ shortName, pkgName }).write();
  },
  /**
   *
   * @description 获取插件已安装的插件列表
   * @returns 返回插件列表
   */
  getPluginPkgList() {
    const result = lowdb
      .get('plugins')
      .map((item, index) => [index + 1, ...Object.values(item)])
      .value();
    return result;
  },
  /**
   * @description 删除插件
   */
  removePluginPkg({ shortName, pkgName }) {
    lowdb.get('plugins').remove({ pkgName }).write();
  },
  /**
   *
   * @param {obejct} param
   * @param {string} param.language 设置脚手架语言
   */
  setLanguageLocale({ language }) {
    lowdb.set('languageLocale', language).write();
  },
};

export { lowdbAction, lowdb };
