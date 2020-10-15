"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "i18n", {
  enumerable: true,
  get: function get() {
    return _i18n.i18n;
  }
});
Object.defineProperty(exports, "initI18nLocales", {
  enumerable: true,
  get: function get() {
    return _i18n.initI18nLocales;
  }
});
exports["default"] = void 0;

var _configs = _interopRequireDefault(require("./configs"));

var _Switch = _interopRequireDefault(require("./ui/Switch"));

var _List = _interopRequireDefault(require("./ui/List"));

var _i18n = require("./lib/i18n");

var _default = {
  config: _configs["default"],
  command: {
    "switch": _Switch["default"],
    list: _List["default"],
    "default": _Switch["default"] // 默认执行的命令

  }
};
exports["default"] = _default;