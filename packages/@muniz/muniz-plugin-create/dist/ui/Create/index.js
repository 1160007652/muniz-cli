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

var _reactRouter = require("react-router");

var TextInput = function TextInput(_ref) {
  var onChange = _ref.onChange,
      placeholder = _ref.placeholder,
      value = _ref.value;

  var _useState = (0, _react.useState)(value),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      desc = _useState2[0],
      setDesc = _useState2[1];

  (0, _ink.useInput)(function (input, key) {
    if (!key.tab) {
      setDesc(desc + input);
    }
  });
  (0, _react.useEffect)(function () {
    onChange(desc);
  }, [desc]);
  return /*#__PURE__*/_react["default"].createElement(_ink.Text, {
    color: "green"
  }, desc || placeholder);
};

var Item = function Item(_ref2) {
  var label = _ref2.label;

  var _useFocus = (0, _ink.useFocus)(),
      isFocused = _useFocus.isFocused;

  var _useState3 = (0, _react.useState)(''),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      value = _useState4[0],
      setValue = _useState4[1];

  return /*#__PURE__*/_react["default"].createElement(_ink.Text, null, label, " ", isFocused ? /*#__PURE__*/_react["default"].createElement(TextInput, {
    value: value,
    onChange: setValue,
    placeholder: label
  }) : value);
};

var Create = function Create() {
  var location = (0, _reactRouter.useLocation)();
  return /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    flexDirection: "column"
  }, /*#__PURE__*/_react["default"].createElement(Item, {
    label: "\u8BF7\u8F93\u5165\u63CF\u8FF0\u4FE1\u606F:"
  }), /*#__PURE__*/_react["default"].createElement(Item, {
    label: "\u8BF7\u9009\u62E9\u521B\u5EFA\u6A21\u7248\u7C7B\u578B:"
  }));
};

var _default = Create;
exports["default"] = _default;