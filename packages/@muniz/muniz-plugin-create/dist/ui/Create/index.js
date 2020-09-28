"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ink = require("ink");

var _reactRouter = require("react-router");

var _inkUi = require("@muniz/ink-ui");

var Create = function Create() {
  return /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    flexDirection: "column"
  }, /*#__PURE__*/_react["default"].createElement(_inkUi.TextInput, {
    label: "\u63CF\u8FF0\uFF1A",
    placeHolder: "\u8BF7\u8F93\u5165\u63CF\u8FF0\u4FE1\u606F"
  }), /*#__PURE__*/_react["default"].createElement(_inkUi.TextInput, {
    label: "\u6A21\u7248\uFF1A",
    placeHolder: "\u8BF7\u9009\u62E9\u521B\u5EFA\u6A21\u7248\u7C7B\u578B"
  }), /*#__PURE__*/_react["default"].createElement(_inkUi.TextInput, {
    label: "\u5BC6\u7801\uFF1A",
    placeHolder: "\u8BF7\u8F93\u5165\u6A21\u7248\u5BC6\u7801",
    type: "password"
  }));
};

var _default = Create;
exports["default"] = _default;