#!/usr/bin/env node
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var _meow = _interopRequireDefault(require("meow"));

var _minimist = _interopRequireDefault(require("minimist"));

var _command = require("../command");

var _useCommand = require("../constants/useCommand");

var _configs = _interopRequireDefault(require("../configs"));

var _cleanOptions = require("../lib/cleanOptions");

var _munizPluginI18n = require("@muniz/muniz-plugin-i18n");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/** 导出模块, 方便 与 其他 plugin 插件 处理机制一致 */
var _default = {
  config: _configs["default"]
};
exports["default"] = _default;

var _argv = (0, _minimist["default"])(process.argv.slice(2)); // 是否是内置 Cli 命令


var isInternalCommand = [].concat((0, _toConsumableArray2["default"])(_useCommand.command), [undefined]).includes(_argv._[0]); // 取 Cli 命令包

var packageName = '@muniz/cli'; // 取 CLi 包的路径 ， 如 xxx/xxx/@muniz/cli  || xxx/xxx/@muniz/muniz-plugin-xxx

var packageJsonPath = __filename.replace(new RegExp('(@muniz/cli)/.*$', 'ig'), function (_, c) {
  return c;
});

if (!isInternalCommand) {
  var _tempPkgPath = "@muniz/muniz-plugin-".concat(_argv._[0]);

  try {
    var _tempPkgJsonPath = require.resolve(_tempPkgPath);

    packageName = _tempPkgPath;
    packageJsonPath = _tempPkgJsonPath.replace(new RegExp("(".concat(_tempPkgPath, ")/.*$"), 'ig'), function (_, c) {
      return c;
    });
  } catch (_unused) {
    // 初始化多语言
    (0, _munizPluginI18n.initI18nLocales)({
      locales: _configs["default"].i18nLocales,
      init: true
    });
    var _notCommandData = {
      isInternalCommand: !isInternalCommand,
      packageName: _tempPkgPath,
      command: _argv._[0]
    };
    (0, _ink.render)( /*#__PURE__*/_react["default"].createElement(_command.UI_NotCommand, _notCommandData));
    process.exit();
  }
}

var _ref = isInternalCommand ? module.exports["default"] : require(packageName)["default"],
    packageConfig = _ref.config; // console.log(packageConfig);


var cliConfig = packageConfig.cliConfig,
    i18nLocales = packageConfig.i18nLocales; // 初始化多语言

(0, _munizPluginI18n.initI18nLocales)({
  locales: i18nLocales,
  init: true
});

var packageJsonInfo = require("".concat(packageJsonPath, "/package.json")); // 重新生成帮助文档


var help = _objectSpread(_objectSpread({}, cliConfig.help), {}, {
  options: (0, _cleanOptions.cleanOptions)(cliConfig.options)
}); // 重新生成版本号
//


var version = {
  version: packageJsonInfo.version,
  author: packageJsonInfo.author,
  name: packageJsonInfo.name
};
var program = (0, _meow["default"])({
  flags: cliConfig.options,
  autoHelp: false,
  autoVersion: false
});
var context = {
  program: program,
  help: help,
  version: version,
  isInternalCommand: isInternalCommand,
  packageJsonPath: packageJsonPath,
  packageJsonInfo: packageJsonInfo
};
(0, _ink.render)( /*#__PURE__*/_react["default"].createElement(_command.UI_APP, context));