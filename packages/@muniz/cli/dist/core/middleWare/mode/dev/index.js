"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _lowdb = require("../../../../lib/lowdb.js");

var _cliI18n = _interopRequireDefault(require("@muniz/cli-i18n"));

var dev = function dev(_ref) {
  var _argv$options;

  var argv = _ref.argv,
      pkgPath = _ref.pkgPath;

  if (((_argv$options = argv.options) === null || _argv$options === void 0 ? void 0 : _argv$options.type) === 'plugin') {
    _lowdb.lowdb.set('MUNIZ_PLUGIN_DEV', true).write();

    console.log("\n ".concat(_cliI18n["default"].getLocale('mode_dev_plugin_tips')));
  } else {
    console.log(_cliI18n["default"].getLocale('mode_dev_tips'));
  }
};

var _default = dev;
exports["default"] = _default;