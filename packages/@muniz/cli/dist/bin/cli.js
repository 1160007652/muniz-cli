#!/usr/bin/env node
'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

var _react = _interopRequireDefault(require('react'));

var _ink = require('ink');

var _CommandApp = require('../core/CommandApp');

var _package = _interopRequireDefault(require('../../package.json'));

// import { formatArgv } from '../core/middleWare/formatArgv';
var commandApp = new _CommandApp.CommandApp({
  argv: process.argv.slice(2),
  pkg: _package['default'],
  i18n: '国际化',
  render: _ink.render,
}); // 使用格式化命令插件

commandApp.use(_CommandApp.formatArgv);
commandApp.use(function (ctx, next) {
  var _tempPkgPath = '@muniz/muniz-plugin-'.concat(ctx.argv[0]);

  try {
    var _tempPkgJsonPath = require.resolve(_tempPkgPath);
  } catch (_unused) {
    ctx.render(/*#__PURE__*/ _react['default'].createElement(_ink.Text, null, '\u63D2\u4EF6\u4E0D\u5B58\u5728'));
  }

  console.log(ctx.argv);
  next();
}); // 启动

commandApp.start();
