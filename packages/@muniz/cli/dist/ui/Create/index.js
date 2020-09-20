"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ink = require("ink");

var Create = function Create(_ref) {
  var input = _ref.input,
      flags = _ref.flags;
  console.log(input, flags);
  return /*#__PURE__*/_react["default"].createElement(_ink.Text, {
    color: "green"
  }, "\u5B89\u88C5 ", input[1], " \u63D2\u4EF6\u4E2D");
};

Create.propTypes = {
  input: _propTypes["default"].array,
  flags: _propTypes["default"].object
};
Create.defaultProps = {
  input: [],
  flags: null
};
var _default = Create;
exports["default"] = _default;