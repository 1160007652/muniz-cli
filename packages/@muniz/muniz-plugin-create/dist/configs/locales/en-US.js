"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _enUS;

var enUS = (_enUS = {
  command_pc_desc: 'Create APP development template',
  projectName: 'Please enter the project name',
  projectDesc: 'Please enter a project description',
  extensionShortName: 'Please enter Chrome extension-short name',
  isGit: 'Whether to start Git?',
  isTypeScript: 'Whether to enable TypeScript?',
  extensionAuthor: 'Please enter Chrome extension-author',
  create_project_have_existed: 'Warning: The project already exists, please change the project name',
  template_project_down: 'Start downloading',
  template_project_down_success: 'Download Success',
  template_project_down_fail: 'Start Fail',
  project_install_npm: 'Start Installation Dependencies',
  project_install_npm_success: 'Install Success',
  project_install_npm_fail: 'Install Fail',
  git_commit_content: 'Initialize project engineering'
}, (0, _defineProperty2["default"])(_enUS, "command_pc_desc", 'Create a PC development template'), (0, _defineProperty2["default"])(_enUS, "command_plugin_desc", 'Create a Scaffolding-Plugin development template'), (0, _defineProperty2["default"])(_enUS, "command_extension_desc", 'Create a Chrome-Extension development template'), (0, _defineProperty2["default"])(_enUS, "command_h5_desc", 'Create a H5 development template'), _enUS);
var _default = enUS;
exports["default"] = _default;