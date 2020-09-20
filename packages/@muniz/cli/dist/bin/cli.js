#!/usr/bin/env node
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var _meow = _interopRequireDefault(require("meow"));

var _ui = require("../ui");

var _munizPluginI18n = _interopRequireDefault(require("@muniz/muniz-plugin-i18n"));

var program = (0, _meow["default"])({
  flags: {
    help: {
      type: 'boolean',
      alias: 'h'
    },
    version: {
      type: 'boolean',
      alias: 'v'
    }
  },
  autoHelp: false
});
/**
 * @description 输入命令小于 2 位,打印 使用帮助文档
 */

if (!process.argv.slice(2).length) {
  // program.showHelp();
  (0, _ink.render)( /*#__PURE__*/_react["default"].createElement(_ui.UI_Command, program.flags));
}

var input = program.input,
    flags = program.flags;

if (input.length === 0 && flags.help) {
  (0, _ink.render)( /*#__PURE__*/_react["default"].createElement(_ui.UI_Command, program.flags));
  process.exit();
}

if (input.length > 0 && flags.help) {
  console.log('打印子命令 help 文档');
  process.exit();
}

if (input.length > 0 && !flags.help) {
  var commander = {
    create: function create(options) {
      (0, _ink.render)( /*#__PURE__*/_react["default"].createElement(_ui.UI_Create, options));
    },
    add: function add() {
      console.log('安装插件');
    }
  }; // 执行子命令

  if ([input[0]] in commander) {
    commander === null || commander === void 0 ? void 0 : commander[input[0]]({
      input: input,
      flags: flags
    });
  } else {
    console.log("\u4E0D\u5B58\u5728\u547D\u4EE4 ".concat(input[0]));
  }
} // console.log(cli);