#!/usr/bin/env node
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var _meow = _interopRequireDefault(require("meow"));

var _minimist = _interopRequireDefault(require("minimist"));

var _useCommand = require("../constants/useCommand");

var _config = require("../config");

var _ui = require("../ui");

var _default = {
  config: _config.config
};
exports["default"] = _default;

var _argv = (0, _minimist["default"])(process.argv.slice(2)); // 是否是内置 Cli 命令


var isInternalCommand = [].concat((0, _toConsumableArray2["default"])(_useCommand.command), [undefined]).includes(_argv._[0]); // 取 Cli 命令包

var packagePath = isInternalCommand ? '@muniz/cli' : "@muniz/muniz-plugin-".concat(_argv._[0]);
var packageConfig = isInternalCommand ? module.exports["default"] : require(packagePath)["default"];
console.log(packageConfig);
var program = (0, _meow["default"])({
  flags: {
    name: {
      type: 'string',
      alias: 'n',
      "default": 'zhipan'
    },
    isOpen: {
      type: 'boolean'
    }
  },
  autoHelp: false,
  autoVersion: false
});
var context = {
  program: program
};
(0, _ink.render)( /*#__PURE__*/_react["default"].createElement(_ui.UI_Create, context));