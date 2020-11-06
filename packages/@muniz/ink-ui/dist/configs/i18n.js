"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _locales = _interopRequireDefault(require("./locales"));

var _cliI18n = _interopRequireDefault(require("@muniz/cli-i18n"));

var pkgInfo = require('../../package.json');

// 获取多语言
var getLocale = _cliI18n["default"].getLocale(pkgInfo.name); // 设置多语言


var setLocale = function setLocale(_ref) {
  var locale = _ref.locale;

  _cliI18n["default"].setLocale({
    locale: locale
  });
}; // 初始化多语言


var initI18n = function initI18n() {
  _cliI18n["default"].setlanguages({
    scope: pkgInfo.name,
    languages: _locales["default"]
  });
}; // 导出工具


var _default = {
  initI18n: initI18n,
  setLocale: setLocale,
  getLocale: getLocale
};
exports["default"] = _default;