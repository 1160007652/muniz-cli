"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.help = exports.options = void 0;

/** 导出 cli 属性 */
var options = {
  name: {
    type: 'string',
    alias: 'n',
    "default": 'zhipan',
    desc: '这是属性描述文案'
  }
};
/** 导出 cli 帮助文档 */

exports.options = options;
var help = {
  header: '创建项目模版的命令',
  footer: '承接展示广告',
  usages: [{
    command: '$ muniz create <command> [options] ',
    desc: ''
  }],
  commands: [{
    command: '$ create <name> ',
    desc: '创建项目工程'
  }],
  // otherOptions: [
  //   { command: '-h, --help ', desc: '显示帮助文档' },
  //   { command: '-v, --version ', desc: '显示版本号' },
  // ],
  examples: [{
    command: '$ create pc_test ',
    desc: '创建一个 pc_test 项目工程 '
  }]
};
exports.help = help;