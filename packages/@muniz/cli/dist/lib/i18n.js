"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _locales = _interopRequireDefault(require("../configs/locales"));

var _cliI18n = _interopRequireDefault(require("@muniz/cli-i18n"));

var pkgInfo = require('../../package.json');

var MunizConfig = require('../configs/system.json');

// 获取多语言
var getLocale = _cliI18n["default"].getLocale(pkgInfo.name); // 初始化多语言


var initI18n = function initI18n() {
  _cliI18n["default"].setlanguages({
    scope: pkgInfo.name,
    languages: _locales["default"]
  });

  _cliI18n["default"].setLocale({
    locale: MunizConfig.languageLocale
  });
}; // 当前语言


var currentLocale = MunizConfig.languageLocale; // 导出工具

var _default = {
  initI18n: initI18n,
  getLocale: getLocale,
  currentLocale: currentLocale
};
exports["default"] = _default;