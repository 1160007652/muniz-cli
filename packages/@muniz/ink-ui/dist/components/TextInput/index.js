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

var Input = function Input(_ref) {
  var onChange = _ref.onChange,
      placeholder = _ref.placeholder,
      value = _ref.value,
      type = _ref.type;

  var _useState = (0, _react.useState)(value),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      desc = _useState2[0],
      setDesc = _useState2[1];

  var _useState3 = (0, _react.useState)(value.length),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      position = _useState4[0],
      setPosition = _useState4[1];

  var _useFocusManager = (0, _ink.useFocusManager)(),
      focusNext = _useFocusManager.focusNext;

  (0, _ink.useInput)(function (input, key) {
    if (key["return"]) {
      // 回车, 切换到下一个 焦点
      focusNext();
    } else if (key["delete"]) {
      // 删除, 从尾部依次删除输入的数据
      var str = desc.substring(0, position - 1) + desc.substring(position, desc.length);
      setDesc(str);
      setPosition(position > 0 ? position - 1 : 0);
    } else if (key.leftArrow) {
      // 左键
      setPosition(position > 0 ? position - 1 : 0);
    } else if (key.rightArrow) {
      // 右键
      setPosition(position < desc.length ? position + 1 : desc.length);
    } else if (!(key.escape || key.tab || key.downArrow || key.upArrow || key.pageDown || key.pageUp || key.ctrl || key.meta)) {
      var _str = desc.substring(0, position) + input + desc.substring(position, desc.length);

      setDesc(_str);
      setPosition(position + input.length);
    }
  });
  (0, _react.useEffect)(function () {
    onChange(desc);
  }, [desc]);

  function renderValue(data) {
    return data.map(function (item, index) {
      if (index === position) {
        return /*#__PURE__*/_react["default"].createElement(_ink.Text, {
          inverse: true,
          key: index
        }, item);
      } else {
        return item;
      }
    });
  }

  var showDesc = type === 'password' ? '*'.repeat(desc.length) : desc;
  showDesc = showDesc + ' ';

  if (desc) {
    showDesc = renderValue(showDesc.split(''));
  } else {
    showDesc = /*#__PURE__*/_react["default"].createElement(_ink.Text, {
      dimColor: true
    }, renderValue(placeholder.split('')));
  }

  return /*#__PURE__*/_react["default"].createElement(_ink.Text, {
    color: "green",
    cursor: 3
  }, showDesc);
};

var TextInput = function TextInput(_ref2) {
  var label = _ref2.label,
      placeHolder = _ref2.placeHolder,
      type = _ref2.type;

  var _useFocus = (0, _ink.useFocus)({
    autoFocus: true
  }),
      isFocused = _useFocus.isFocused;

  var _useState5 = (0, _react.useState)(''),
      _useState6 = (0, _slicedToArray2["default"])(_useState5, 2),
      value = _useState6[0],
      setValue = _useState6[1];

  var showValue = type === 'password' ? '*'.repeat(value.length) : value;
  return /*#__PURE__*/_react["default"].createElement(_ink.Text, null, label, isFocused ? /*#__PURE__*/_react["default"].createElement(Input, {
    value: value,
    onChange: setValue,
    type: type,
    placeholder: placeHolder
  }) : showValue);
};

var _default = TextInput;
exports["default"] = _default;