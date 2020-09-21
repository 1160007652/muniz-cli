'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;
var _default = {
  header: '创建项目工程命令，可以创建 基于React 框架 实现的 “ H5、PC、浏览器插件、SSR同构 ” 项目工程 ',
  footer: '如有问题，请联系作者 1160007652@qq.com',
  usages: [
    {
      command: '$ muniz create <command> [options] ',
      desc: '',
    },
  ],
  // commands: [
  //   { command: '$ create <name> ', desc: '创建项目工程' },
  //   { command: '$ add    <name> ', desc: '添加插件' },
  // ],
  options: [
    {
      command: '--git ',
      desc: '是否初始化git',
    },
  ],
  otherOptions: [
    {
      command: '-h, --help ',
      desc: '显示帮助文档',
    },
  ],
  examples: [
    {
      command: '$ muniz create pc_test ',
      desc: '创建一个 pc_test 项目工程 ',
    },
  ],
};
exports['default'] = _default;
