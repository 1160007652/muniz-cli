'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.lowdb = exports.lowdbAction = void 0;

var path = require('path');

var DataSource = require('lowdb');

var FileSync = require('lowdb/adapters/FileSync');

var adapter = new FileSync(path.resolve(__dirname, '../configs/system.json'));
var lowdb = DataSource(adapter); // 默认脚手架 配置数据

exports.lowdb = lowdb;
var defaultSystemData = {
  MUNIZ_CLI_DEBUG: false,
  MUNIZ_PLUGIN_DEV: false,
  plugins: [],
};
lowdb.defaults(defaultSystemData).write();
var lowdbAction = {
  // 获取「 开发脚手架 」的执行环境模式
};
exports.lowdbAction = lowdbAction;
