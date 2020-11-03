'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require('@babel/runtime/helpers/objectWithoutProperties'));

var _react = _interopRequireDefault(require('react'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _ink = require('ink');

var Select = function Select(_ref) {
  var children = _ref.children,
    onBlur = _ref.onBlur,
    wait = _ref.wait,
    disabled = _ref.disabled,
    props = (0, _objectWithoutProperties2['default'])(_ref, ['children', 'onBlur', 'wait', 'disabled']);

  var _useFocus = (0, _ink.useFocus)({
      autoFocus: true,
      isActive: !disabled,
    }),
    isFocused = _useFocus.isFocused;

  var _useFocusManager = (0, _ink.useFocusManager)(),
    disableFocus = _useFocusManager.disableFocus,
    enableFocus = _useFocusManager.enableFocus,
    focusNext = _useFocusManager.focusNext; // 防抖计时器

  var timer = null;
  (0, _ink.useInput)(function (_, key) {
    if (isFocused) {
      if (key['return']) {
        if (timer) {
          clearTimeout(timer);
        }

        timer = setTimeout(function () {
          onBlur();
          clearTimeout(timer);
        }, wait);
      } else if (key.tab) {
        // 切换焦点后，结束 执行事件
        clearTimeout(timer);
      }
    }
  });
  return /*#__PURE__*/ _react['default'].createElement(
    _ink.Box,
    props,
    /*#__PURE__*/ _react['default'].createElement(
      _ink.Box,
      {
        width: '2',
      },
      /*#__PURE__*/ _react['default'].createElement(_ink.Text, null, isFocused ? '●' : '○'),
    ),
    /*#__PURE__*/ _react['default'].createElement(
      _ink.Text,
      {
        inverse: isFocused,
        bold: isFocused,
        dimColor: disabled,
      },
      children,
    ),
  );
};

Select.propTypes = {
  onBlur: _propTypes['default'].func,
  wait: _propTypes['default'].oneOfType([_propTypes['default'].string, _propTypes['default'].number]),
  disabled: _propTypes['default'].bool,
};
Select.defaultProps = {
  onBlur: function onBlur() {},
  wait: 600,
  disabled: false,
};
var _default = Select;
exports['default'] = _default;
