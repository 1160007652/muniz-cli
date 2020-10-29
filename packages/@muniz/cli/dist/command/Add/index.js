"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _ink = require("ink");

var _propTypes = _interopRequireDefault(require("prop-types"));

/**
 * @muniz
 * @description 添加插件
 */
var Add = function Add(props) {
  var _useState = (0, _react.useState)(1),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      count = _useState2[0],
      setCount = _useState2[1];

  return /*#__PURE__*/_react["default"].createElement(_ink.Text, null, "\u6DFB\u52A0\u63D2\u4EF6\u547D\u4EE4-", count);
};

Add.propTypes = {
  /**
   * @muniz
   * @description falgs哈哈
   */
  mode: _propTypes["default"].string,

  /**
   * @muniz
   * @description 生成项目的名称
   * @alias n
   */
  isGit: _propTypes["default"].bool
};
Add.defaultProps = {
  mode: 'dev',
  isGit: false
};
var _default = Add;
exports["default"] = _default;