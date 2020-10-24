"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var NotCommand = function NotCommand(props) {
  var pkgName = props.pkgName,
      argv = props.argv,
      env = props.env,
      _props$isExistPlugin = props.isExistPlugin,
      isExistPlugin = _props$isExistPlugin === void 0 ? false : _props$isExistPlugin;
  /**
   * 可以在这里做 命令 推荐
   */

  var cliNotCommand = function cliNotCommand() {
    return /*#__PURE__*/_react["default"].createElement(_ink.Box, {
      flexDirection: "column",
      paddingTop: 1
    }, /*#__PURE__*/_react["default"].createElement(_ink.Text, null, "\u8BE5 ", /*#__PURE__*/_react["default"].createElement(_ink.Text, {
      color: "green"
    }, argv.command[0]), " \u547D\u4EE4\u4E0D\u5728\u5185\u7F6E\u547D\u4EE4\u5F53\u4E2D\uFF0C\u5C5E\u4E8E\u63D2\u4EF6\u547D\u4EE4\u3002"), /*#__PURE__*/_react["default"].createElement(_ink.Box, {
      marginTop: "1",
      marginBottom: "1"
    }, /*#__PURE__*/_react["default"].createElement(_ink.Text, null, "\u63D0\u793A: \u53EF\u4EE5\u5C1D\u8BD5\u6267\u884C\u4EE5\u4E0B\u547D\u4EE4\u8FDB\u884C\u4FEE\u590D")), /*#__PURE__*/_react["default"].createElement(_ink.Text, {
      color: "green"
    }, "\u547D\u4EE4: muniz add ".concat(pkgName)));
  };

  var pluginNotCommand = function pluginNotCommand() {
    return /*#__PURE__*/_react["default"].createElement(_ink.Box, {
      flexDirection: "column",
      paddingTop: 1
    }, /*#__PURE__*/_react["default"].createElement(_ink.Text, null, isExistPlugin ? /*#__PURE__*/_react["default"].createElement(_ink.Text, null, "\u8BE5 ", /*#__PURE__*/_react["default"].createElement(_ink.Text, {
      color: "green"
    }, argv.command[0]), " \u63D2\u4EF6\u4E2D, \u4E0D\u5B58\u5728", /*#__PURE__*/_react["default"].createElement(_ink.Text, {
      color: "green"
    }, argv.command[1]), "\u547D\u4EE4\u3002") : /*#__PURE__*/_react["default"].createElement(_ink.Text, null, "\u8BE5 ", /*#__PURE__*/_react["default"].createElement(_ink.Text, {
      color: "green"
    }, argv.command[0]), " \u547D\u4EE4\uFF0C\u6709\u53EF\u80FD\u662F\u4E00\u4E2A\u63D2\u4EF6\u63D0\u4F9B\u7684\uFF0C\u4E0D\u5728\u300C CLI \u300D\u5185\u7F6E\u547D\u4EE4\u5F53\u4E2D\u3002")), /*#__PURE__*/_react["default"].createElement(_ink.Box, {
      marginTop: "1",
      marginBottom: "1"
    }, /*#__PURE__*/_react["default"].createElement(_ink.Text, null, "\u63D0\u793A: \u53EF\u4EE5\u5C1D\u8BD5\u6267\u884C\u4EE5\u4E0B\u547D\u4EE4\u8FDB\u884C\u4FEE\u590D")), /*#__PURE__*/_react["default"].createElement(_ink.Text, {
      color: "green"
    }, "\u547D\u4EE4: muniz add ".concat(pkgName)));
  };

  return env.command === 'cli' ? cliNotCommand() : pluginNotCommand();
};

var _default = NotCommand;
exports["default"] = _default;