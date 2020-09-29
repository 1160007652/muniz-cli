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
  var name = _ref.name,
      label = _ref.label,
      value = _ref.value,
      placeHolder = _ref.placeHolder,
      type = _ref.type,
      onChange = _ref.onChange,
      forwardRef = _ref.forwardRef;

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
    onChange(_value); // forwardRef.register({ name, _value });
    // console.log(forwardRef);
  }, [_value]);

  var onBlur = function onBlur() {
    console.log('失去焦点');
  };
  /** 暴露出去, 可以调用的ref */
  // useImperativeHandle(forwardRef, () => ({
  //   onChange,
  //   value,
  //   onBlur,
  // }));


  return /*#__PURE__*/_react["default"].createElement(_ink.Box, null, /*#__PURE__*/_react["default"].createElement(_ink.Text, null, label, isFocused ? /*#__PURE__*/_react["default"].createElement(_Input["default"], {
    value: _value,
    onChange: setValue,
    type: type,
    placeholder: placeHolder
  }) : showValue));
};

TextInput.propTypes = {
  onChange: _propTypes["default"].func,
  type: _propTypes["default"].string,
  placeHolder: _propTypes["default"].string,
  value: _propTypes["default"].string,
  label: _propTypes["default"].string,
  name: _propTypes["default"].string
};
TextInput.defaultProps = {
  onChange: function onChange() {},
  type: '',
  placeHolder: '',
  value: '',
  label: '',
  name: ''
}; // export default React.forwardRef((props, ref) => {
//   return <TextInput {...props} forwardRef={ref} />;
// });

var _default = TextInput;
exports["default"] = _default;