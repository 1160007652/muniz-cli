"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ink = require("ink");

var Version = function Version(_ref) {
  var data = _ref.data;
  return /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    flexDirection: "column",
    paddingTop: 1
  }, /*#__PURE__*/_react["default"].createElement(_ink.Text, null, "\u5F53\u524D\u7248\u672C\uFF1A0.0.0"));
};

var _default = Version;
exports["default"] = _default;