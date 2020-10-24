"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectDestructuringEmpty2 = _interopRequireDefault(require("@babel/runtime/helpers/objectDestructuringEmpty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ink = require("ink");

var _reactRouter = require("react-router");

var _inkUi = require("@muniz/ink-ui");

var _Add = _interopRequireDefault(require("../Add"));

// import { default as UI_Help } from '../Help';
// import { default as UI_Version } from '../Version';

/**
 * @muniz
 * @description 这是入口命令
 */
var App = function App(context) {
  (0, _objectDestructuringEmpty2["default"])(context);
  return /*#__PURE__*/_react["default"].createElement(_reactRouter.StaticRouter, {
    location: {
      pathname: command,
      state: flags
    },
    context: context
  }, /*#__PURE__*/_react["default"].createElement(_reactRouter.Switch, null, /*#__PURE__*/_react["default"].createElement(_reactRouter.Route, {
    exact: true,
    path: "help"
  }, /*#__PURE__*/_react["default"].createElement(_inkUi.Help, {
    data: help
  })), /*#__PURE__*/_react["default"].createElement(_reactRouter.Route, {
    path: "version"
  }, /*#__PURE__*/_react["default"].createElement(_inkUi.Version, {
    data: version
  })), /*#__PURE__*/_react["default"].createElement(_reactRouter.Route, {
    path: "add",
    component: _Add["default"]
  }), /*#__PURE__*/_react["default"].createElement(_reactRouter.Route, {
    path: command
  }, DynamicCommandUI ? /*#__PURE__*/_react["default"].createElement(DynamicCommandUI, null) : /*#__PURE__*/_react["default"].createElement(_ink.Text, null, "\u4E0D\u5B58\u5728\u8BE5\u547D\u4EE4"))));
};

App.propTypes = {
  /**
   * @muniz
   * @description 描述组件
   * @alias i
   */
  input: _propTypes["default"].string.isRequired,

  /**
   * @muniz
   */
  flags: _propTypes["default"].object,

  /**
   * @muniz
   * @description 生成项目的名称
   * @alias n
   */
  isGit: _propTypes["default"].bool
};
App.defaultProps = {
  input: 'ssss',
  flags: null,
  isGit: false
};
var _default = App;
exports["default"] = _default;