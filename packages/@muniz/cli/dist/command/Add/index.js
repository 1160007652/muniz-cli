"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var _reactRouter = require("react-router");

/**
 * @muniz
 * @description 添加插件
 */
var Add = function Add() {
  var location = (0, _reactRouter.useLocation)();
  console.log(location);
  return /*#__PURE__*/_react["default"].createElement(_ink.Text, null, "\u6DFB\u52A0\u63D2\u4EF6\u547D\u4EE4");
};

var _default = Add;
exports["default"] = _default;