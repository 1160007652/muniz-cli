const path = require('path');
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
  // 获取「 开发脚手架 」的执行环境模式
};

export { lowdbAction, lowdb };
