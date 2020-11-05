#!/usr/bin/env node
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _ink = require("ink");

var _CommandApp = require("../core/CommandApp");

var _locales = _interopRequireDefault(require("../configs/locales"));

var _cliI18n = _interopRequireDefault(require("@muniz/cli-i18n"));

var semver = require('semver');

var requiredVersion = require('../../package.json').engines.node;

var MunizConfig = require('../configs/system.json');

_cliI18n["default"].setLocale({
  locale: MunizConfig.languageLocale
});

_cliI18n["default"].setlanguages({
  languages: _locales["default"]
});
/**
 *
 * @param {String} wanted 设定的最小兼容版本号
 * @param {String} id npm包名称
 * @description 强制检查 脚手架版本依赖是否大于给定的值
 * @returns 条件成立继续执行,否则退出
 *
 */


function checkNodeVersion(wanted, id) {
  if (!semver.satisfies(process.version, wanted)) {
    console.log(_cliI18n["default"].getLocale('check_node_version_tips', {
      version: process.version,
      id: id,
      wanted: wanted
    }));
    process.exit(1);
  }
}

checkNodeVersion(requiredVersion, '@muniz/cli'); // 初始化 命令行 框架

var commandApp = new _CommandApp.CommandApp({
  argv: process.argv.slice(2),
  render: _ink.render
}); // 中间件 => 格式化命令

commandApp.use(_CommandApp.formatArgv); // 中间件 => 判断是否存在命令

commandApp.use(_CommandApp.isCommand);
/**
 * 中间件
 * 开发者模式 用于执行 dev  eg: muniz --mode=dev
 * 生产者模式 用于执行 build eg: muniz --mode=pro
 */

commandApp.use(_CommandApp.mode); // 中间件 => 整合 cmd 命令参数

commandApp.use(_CommandApp.mergeArgv); // 中间件 => 显示使用帮助

commandApp.use(_CommandApp.helpCommand); // 中间件 => 显示版本号

commandApp.use(_CommandApp.versionCommand); // 中间件 => 执行命令

commandApp.use(_CommandApp.runCommand); // 启动

commandApp.start();