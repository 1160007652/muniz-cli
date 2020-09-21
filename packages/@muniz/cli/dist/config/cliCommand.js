'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;
var Command = {
  header: {
    desc: 'muniz脚手架, 基于插件机制开发, 自成一套体系',
  },
  footer: {
    desc: '底部描述',
  },
  usage: [
    {
      command: '$ muniz <command> [options] ',
      desc: '',
    },
  ],
  command: [
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
  Examples: [
    {
      command: '$ create pc_test ',
      desc: '创建一个 pc_test 项目工程 ',
    },
  ],
};
var _default = Command;
exports['default'] = _default;
