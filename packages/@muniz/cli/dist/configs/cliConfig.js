"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.help = exports.options = void 0;

/** 导出 cli 属性 */
var options = {
  isGit: {
    type: 'boolean',
    alias: 'g',
    "default": true,
    desc: '是否初始化Git'
  },
  isOpen: {
    type: 'boolean'
  }
};
/** 导出 cli 帮助文档 */

exports.options = options;
var help = {
  header: 'muniz脚手架, 基于插件机制开发, 自成一套体系',
  footer: '你好',
  usages: [{
    command: '$ muniz <command> [options]',
    desc: ''
  }],
  commands: [{
    command: '$ create <name>',
    desc: '创建项目工程'
  }, {
    command: '$ add    <name>',
    desc: '添加插件'
  }],
  otherOptions: [{
    command: '-h, --help',
    desc: '显示帮助文档'
  }, {
    command: '-v, --version',
    desc: '显示版本号'
  }],
  examples: [{
    command: '$ create pc_test ',
    desc: '创建一个 pc_test 项目工程 '
  }]
};
exports.help = help;