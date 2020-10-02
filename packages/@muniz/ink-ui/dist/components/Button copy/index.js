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

var Button = function Button(_ref) {
  var children = _ref.children,
    onBlur = _ref.onBlur,
    interval = _ref.interval,
    disabled = _ref.disabled,
    props = (0, _objectWithoutProperties2['default'])(_ref, ['children', 'onBlur', 'interval', 'disabled']);

  var _useFocus = (0, _ink.useFocus)({
      autoFocus: true,
      isActive: !disabled,
    }),
    isFocused = _useFocus.isFocused;

  var _useFocusManager = (0, _ink.useFocusManager)(),
    disableFocus = _useFocusManager.disableFocus,
    enableFocus = _useFocusManager.enableFocus;

  (0, _ink.useInput)(function (_, key) {
    if (isFocused) {
      if (key['return']) {
        onBlur();
      } else if (key.tab) {
        if (disabled) {
          disableFocus();
        } else {
          enableFocus();
        }
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
  interval: _propTypes['default'].oneOfType([_propTypes['default'].string, _propTypes['default'].number]),
  disabled: _propTypes['default'].bool,
};
Button.defaultProps = {
  onBlur: function onBlur() {},
  interval: 3,
  disabled: false,
};
var _default = Button;
exports['default'] = _default;
