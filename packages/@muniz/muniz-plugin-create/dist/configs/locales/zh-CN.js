"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _zhCN;

var zhCN = (_zhCN = {
  command_pc_desc: '创建PC开发模版',
  projectName: '请输入项目名称',
  projectDesc: '请输入项目描述',
  extensionShortName: '请输入Chrome扩展-短名称',
  isGit: '是否启动Git?',
  isTypeScript: '是否启用TypeScript?',
  extensionAuthor: '请输入Chrome扩展-作者',
  create_project_have_existed: '警告: 该项目已存在，请重新更换一个项目名称',
  template_project_down: '开始下载',
  template_project_down_success: '下载成功',
  template_project_down_fail: '开始失败',
  project_install_npm: '安装依赖',
  project_install_npm_success: '安装成功',
  project_install_npm_fail: '安装失败',
  git_commit_content: '初始化项目工程'
}, (0, _defineProperty2["default"])(_zhCN, "command_pc_desc", '创建PC开发模版'), (0, _defineProperty2["default"])(_zhCN, "command_plugin_desc", '创建脚手架插件开发模版'), (0, _defineProperty2["default"])(_zhCN, "command_extension_desc", '创建Chrome扩展开发模版'), (0, _defineProperty2["default"])(_zhCN, "command_h5_desc", '创建H5开发模版'), (0, _defineProperty2["default"])(_zhCN, "command_electron_desc", '创建Electron开发模版'), _zhCN);
var _default = zhCN;
exports["default"] = _default;