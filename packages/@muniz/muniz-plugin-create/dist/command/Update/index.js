"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ink = require("ink");

var _cliI18n = _interopRequireDefault(require("@muniz/cli-i18n"));

/**
 * @muniz
 * @type react
 * @description 更新模版命令
 */
var Update = function Update() {
  return /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    flexDirection: "column",
    padding: 1
  }, /*#__PURE__*/_react["default"].createElement(_ink.Text, null, _cliI18n["default"].getLocale('command_update_title')));
};

Update.propTypes = {
  /**
   * @muniz
   * @description 描述组件
   * @alias i
   */
  inputa: _propTypes["default"].string.isRequired,

  /**
   * @muniz
   * @positionsArgs 1
   */
  flags: _propTypes["default"].string,

  /**
   * @muniz
   * @description 生成项目的名称
   * @alias n
   */
  isGit: _propTypes["default"].bool
};
Update.defaultProps = {
  inputa: 'ssss',
  flags: 'wowowoowqqqqqqq',
  isGit: false
};
var _default = Update;
exports["default"] = _default;