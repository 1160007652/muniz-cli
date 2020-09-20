"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ink = require("ink");

var Command = function Command(_ref) {
  var name = _ref.name;
  return /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    flexDirection: "column",
    paddingTop: 1
  }, /*#__PURE__*/_react["default"].createElement(_ink.Text, null, "muniz\u811A\u624B\u67B6, \u57FA\u4E8E\u63D2\u4EF6\u673A\u5236\u5F00\u53D1, \u81EA\u6210\u4E00\u5957\u4F53\u7CFB"), /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    paddingTop: 1,
    paddingBottom: 1
  }, /*#__PURE__*/_react["default"].createElement(_ink.Text, {
    bold: true,
    color: "blue"
  }, "Usage")), /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    marginLeft: 2,
    flexDirection: "column"
  }, /*#__PURE__*/_react["default"].createElement(_ink.Text, null, "$ muniz <command> [options]")), /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    paddingTop: 1,
    paddingBottom: 1
  }, /*#__PURE__*/_react["default"].createElement(_ink.Text, {
    bold: true,
    color: "blue"
  }, "[Command]")), /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    marginLeft: 2,
    flexDirection: "column"
  }, /*#__PURE__*/_react["default"].createElement(_ink.Text, null, /*#__PURE__*/_react["default"].createElement(_ink.Text, null, "$ create <name> "), /*#__PURE__*/_react["default"].createElement(_ink.Text, {
    dimColor: true
  }, "\u521B\u5EFA\u9879\u76EE\u5DE5\u7A0B")), /*#__PURE__*/_react["default"].createElement(_ink.Text, null, /*#__PURE__*/_react["default"].createElement(_ink.Text, null, "$ add    <name> "), /*#__PURE__*/_react["default"].createElement(_ink.Text, {
    dimColor: true
  }, "\u6DFB\u52A0\u63D2\u4EF6"))), /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    paddingTop: 1,
    paddingBottom: 1
  }, /*#__PURE__*/_react["default"].createElement(_ink.Text, {
    bold: true,
    color: "green"
  }, "Options")), /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    marginLeft: 2,
    flexDirection: "column"
  }, /*#__PURE__*/_react["default"].createElement(_ink.Text, null, /*#__PURE__*/_react["default"].createElement(_ink.Text, null, "--name "), /*#__PURE__*/_react["default"].createElement(_ink.Text, {
    dimColor: true
  }, "\u5C5E\u6027"))), /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    paddingTop: 1,
    paddingBottom: 1
  }, /*#__PURE__*/_react["default"].createElement(_ink.Text, {
    bold: true,
    color: "green"
  }, "Other Options")), /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    marginLeft: 2,
    flexDirection: "column"
  }, /*#__PURE__*/_react["default"].createElement(_ink.Text, null, /*#__PURE__*/_react["default"].createElement(_ink.Text, null, "-h, --help "), /*#__PURE__*/_react["default"].createElement(_ink.Text, {
    dimColor: true
  }, "\u663E\u793A\u5E2E\u52A9\u6587\u6863")), /*#__PURE__*/_react["default"].createElement(_ink.Text, null, /*#__PURE__*/_react["default"].createElement(_ink.Text, null, "-v, --version "), /*#__PURE__*/_react["default"].createElement(_ink.Text, {
    dimColor: true
  }, "\u663E\u793A\u7248\u672C\u53F7"))), /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    paddingTop: 1,
    paddingBottom: 1
  }, /*#__PURE__*/_react["default"].createElement(_ink.Text, {
    bold: true,
    color: "yellow"
  }, "Examples")), /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    marginLeft: 2,
    flexDirection: "column"
  }, /*#__PURE__*/_react["default"].createElement(_ink.Text, null, /*#__PURE__*/_react["default"].createElement(_ink.Text, null, "$ create pc_test "), /*#__PURE__*/_react["default"].createElement(_ink.Text, {
    dimColor: true
  }, "\u521B\u5EFA\u4E00\u4E2A pc_test \u9879\u76EE\u5DE5\u7A0B"))));
};

var _default = Command;
exports["default"] = _default;