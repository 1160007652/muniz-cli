"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var _reactRouter = require("react-router");

var Item = function Item(_ref) {
  var label = _ref.label;

  var _useFocus = (0, _ink.useFocus)(),
      isFocused = _useFocus.isFocused;

  return /*#__PURE__*/_react["default"].createElement(_ink.Text, null, label, " ", isFocused && /*#__PURE__*/_react["default"].createElement(_ink.Text, {
    color: "green"
  }, "(focused)"));
};
/**
 * @muniz
 * @description 更新 多语言
 */


var Update = function Update() {
  var params = (0, _reactRouter.useLocation)(); // console.log(params);
  // return <Text>更新 Create 插件 命令 </Text>;

  return /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    flexDirection: "column",
    padding: 1
  }, /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    marginBottom: 1
  }, /*#__PURE__*/_react["default"].createElement(_ink.Text, null, "Press Tab to focus next element, Shift+Tab to focus previous element, Esc to reset focus.")), /*#__PURE__*/_react["default"].createElement(Item, {
    label: "First"
  }), /*#__PURE__*/_react["default"].createElement(Item, {
    label: "Second"
  }), /*#__PURE__*/_react["default"].createElement(Item, {
    label: "Third"
  }));
};

var _default = Update;
exports["default"] = _default;