const path = require('path');
const inquirer = require('inquirer');
const DataSource = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

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
      // 清除控制台内容
      console.clear();
      return pkgNameList[0].pkgName;
    }
    // 如果 > 1 表示 只安装了 多个 插件, 需要用户进行交互选择
    if (pkgNameList.length > 1) {
      const promptList = [
        {
          type: 'list',
          message: '检查到多个指令，请问执行哪一个',
          name: 'pkgName',
          default: '',
          choices: pkgNameList,
        },
      ];

      const answers = await inquirer.prompt(promptList);
      // 清除控制台内容
      console.clear();
      return answers.pkgName;
    }
  },
};

export { lowdbAction, lowdb };
