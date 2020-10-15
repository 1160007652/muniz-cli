"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ink = require("ink");

var _Input = _interopRequireDefault(require("../Input"));

var TextInput = function TextInput(_ref) {
  var label = _ref.label,
      value = _ref.value,
      placeHolder = _ref.placeHolder,
      type = _ref.type,
      onChange = _ref.onChange,
      onBlur = _ref.onBlur,
      error = _ref.error;

  var _useFocus = (0, _ink.useFocus)({
    autoFocus: true
  }),
      isFocused = _useFocus.isFocused;

  var _useState = (0, _react.useState)(value),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      _value = _useState2[0],
      setValue = _useState2[1];

  var showValue = type === 'password' ? '*'.repeat(_value.length) : _value;
  (0, _react.useEffect)(function () {
    setValue(value);
  }, [value]);
  (0, _react.useEffect)(function () {
    onChange(_value);
  }, [_value]); // 焦点监听

  (0, _react.useEffect)(function () {
    // 失去焦点时触发
    if (!isFocused) {
      onBlur(_value);
    }
  }, [isFocused]);
  return /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    flexDirection: "column"
  }, /*#__PURE__*/_react["default"].createElement(_ink.Box, null, /*#__PURE__*/_react["default"].createElement(_ink.Text, {
    bold: isFocused
  }, label, isFocused ? /*#__PURE__*/_react["default"].createElement(_Input["default"], {
    value: _value,
    onChange: setValue,
    type: type,
    placeholder: placeHolder
  }) : showValue)), /*#__PURE__*/_react["default"].createElement(_ink.Box, null, /*#__PURE__*/_react["default"].createElement(_ink.Text, null, error && /*#__PURE__*/_react["default"].createElement(_ink.Text, {
    color: "red"
  }, "error: "), /*#__PURE__*/_react["default"].createElement(_ink.Text, {
    dimColor: true
  }, error))));
};

TextInput.propTypes = {
  onChange: _propTypes["default"].func,
  onBlur: _propTypes["default"].func,
  type: _propTypes["default"].string,
  placeHolder: _propTypes["default"].string,
  value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  label: _propTypes["default"].string,
  error: _propTypes["default"].string
};
TextInput.defaultProps = {
  onChange: function onChange() {},
  onBlur: function onBlur() {},
  type: '',
  placeHolder: '',
  value: '',
  label: '',
  error: ''
}; // export default React.forwardRef((props, ref) => {
//   return <TextInput {...props} forwardRef={ref} />;
// });

var _default = TextInput;
exports["default"] = _default;