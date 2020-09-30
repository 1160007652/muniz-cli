'use strict';

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard');

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _slicedToArray2 = _interopRequireDefault(require('@babel/runtime/helpers/slicedToArray'));

var _objectWithoutProperties2 = _interopRequireDefault(require('@babel/runtime/helpers/objectWithoutProperties'));

var _react = _interopRequireWildcard(require('react'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _ink = require('ink');

var Button = function Button(_ref) {
  var children = _ref.children,
    onBlur = _ref.onBlur,
    interval = _ref.interval,
    props = (0, _objectWithoutProperties2['default'])(_ref, ['children', 'onBlur', 'interval']);

  var _useFocus = (0, _ink.useFocus)({
      autoFocus: true,
    }),
    isFocused = _useFocus.isFocused;

  var _useState = (0, _react.useState)(Number(interval)),
    _useState2 = (0, _slicedToArray2['default'])(_useState, 2),
    time = _useState2[0],
    setTime = _useState2[1]; // 如果获得焦点，触发点击事件

  (0, _react.useEffect)(
    function () {
      var timer = null;

      if (isFocused) {
        timer = setInterval(function () {
          setTime(function (prevTime) {
            var curentTime = prevTime - 1;

            if (curentTime === 0) {
              clearInterval(timer);
            }

            return curentTime;
          });
        }, 1000);
      } else {
        setTime(Number(interval));
      }

      return function () {
        clearInterval(timer);
      };
    },
    [isFocused],
  );
  (0, _react.useEffect)(
    function () {
      if (time === 0) {
        onBlur();
      }
    },
    [time],
  );
  return /*#__PURE__*/ _react['default'].createElement(
    _ink.Box,
    props,
    /*#__PURE__*/ _react['default'].createElement(
      _ink.Text,
      {
        inverse: isFocused,
      },
      children,
      isFocused && /*#__PURE__*/ _react['default'].createElement(_ink.Text, null, '('.concat(time, 's)')),
    ),
  );
};

Button.propTypes = {
  onBlur: _propTypes['default'].func,
  interval: _propTypes['default'].oneOfType([_propTypes['default'].string, _propTypes['default'].number]),
};
Button.defaultProps = {
  onBlur: function onBlur() {},
  interval: 3,
};
var _default = Button;
exports['default'] = _default;
