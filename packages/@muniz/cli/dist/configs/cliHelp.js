'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.cliHelp = exports.cliOptions = void 0;

/** 导出 cli 属性 */
var cliOptions = {
  name: {
    type: 'string',
    alias: 'n',
    default: 'zhipan',
  },
  isOpen: {
    type: 'boolean',
  },
};
/** 导出 cli 帮助文档 */

exports.cliOptions = cliOptions;
var cliHelp = {
  header: 'muniz脚手架, 基于插件机制开发, 自成一套体系',
  footer: '底部描述',
  usages: [
    {
      command: '$ muniz <command> [options] ',
      desc: '',
    },
  ],
  commands: [
    {
      command: '$ create <name> ',
      desc: '创建项目工程',
    },
    {
      command: '$ add    <name> ',
      desc: '添加插件',
    },
  ],
  options: [
    {
      command: '--name ',
      desc: '属性',
    },
  ],
  otherOptions: [
    {
      command: '-h, --help ',
      desc: '显示帮助文档',
    },
    {
      command: '-v, --version ',
      desc: '显示版本号',
    },
  ],
  examples: [
    {
      command: '$ create pc_test ',
      desc: '创建一个 pc_test 项目工程 ',
    },
  ],
};
exports.cliHelp = cliHelp;
