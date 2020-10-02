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

// import { debounce } from '@muniz/cli-shared-utils';
var Button = function Button(_ref) {
  var children = _ref.children,
    onBlur = _ref.onBlur,
    wait = _ref.wait,
    disabled = _ref.disabled,
    leftDisabled = _ref.leftDisabled,
    rightDisabled = _ref.rightDisabled,
    props = (0, _objectWithoutProperties2['default'])(_ref, [
      'children',
      'onBlur',
      'wait',
      'disabled',
      'leftDisabled',
      'rightDisabled',
    ]);

  var _useFocus = (0, _ink.useFocus)({
      autoFocus: true,
      isActive: !disabled,
    }),
    isFocused = _useFocus.isFocused;

  var _useFocusManager = (0, _ink.useFocusManager)(),
    disableFocus = _useFocusManager.disableFocus,
    enableFocus = _useFocusManager.enableFocus,
    focusNext = _useFocusManager.focusNext; // 防抖计时器

  var timer = null; // 是否激活焦点

  function isFocus(flag) {
    if (flag) {
      disableFocus();
    } else {
      enableFocus();
    }
  }

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
        isFocus();
      }
    }
  });
  return /*#__PURE__*/ _react['default'].createElement(
    _ink.Box,
    props,
    /*#__PURE__*/ _react['default'].createElement(
      _ink.Text,
      {
        inverse: isFocused,
        dimColor: disabled,
      },
      children,
    ),
  );
};

Button.propTypes = {
  onBlur: _propTypes['default'].func,
  wait: _propTypes['default'].oneOfType([_propTypes['default'].string, _propTypes['default'].number]),
  disabled: _propTypes['default'].bool,
  leftDisabled: _propTypes['default'].bool,
  rightDisabled: _propTypes['default'].bool,
};
Button.defaultProps = {
  onBlur: function onBlur() {},
  wait: 600,
  disabled: false,
  leftDisabled: false,
  rightDisabled: false,
};
var _default = Button;
exports['default'] = _default;
