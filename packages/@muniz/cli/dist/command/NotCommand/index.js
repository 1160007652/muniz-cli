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
      argv = props.argv;
  var command = argv.input[0];
  /**
   * 可以在这里做 命令 推荐
   */

  return /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    flexDirection: "column",
    paddingTop: 1
  }, /*#__PURE__*/_react["default"].createElement(_ink.Text, null, "\u8BE5 ", /*#__PURE__*/_react["default"].createElement(_ink.Text, {
    color: "green"
  }, command), " \u547D\u4EE4\u4E0D\u5728\u5185\u7F6E\u547D\u4EE4\u5F53\u4E2D\uFF0C\u5C5E\u4E8E\u63D2\u4EF6\u547D\u4EE4\u3002"), /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    marginTop: "1",
    marginBottom: "1"
  }, /*#__PURE__*/_react["default"].createElement(_ink.Text, null, "\u63D0\u793A: \u53EF\u4EE5\u5C1D\u8BD5\u6267\u884C\u4EE5\u4E0B\u547D\u4EE4\u8FDB\u884C\u4FEE\u590D")), /*#__PURE__*/_react["default"].createElement(_ink.Text, {
    color: "green"
  }, "\u547D\u4EE4: muniz add ".concat(pkgName)));
};

var _default = NotCommand;
exports["default"] = _default;