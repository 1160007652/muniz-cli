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

var _cliSpinners = _interopRequireDefault(require('cli-spinners'));

var _ink = require('ink');

var Spinner = function Spinner(_ref) {
  var children = _ref.children,
    type = _ref.type,
    props = (0, _objectWithoutProperties2['default'])(_ref, ['children', 'type']);

  var _useState = (0, _react.useState)(0),
    _useState2 = (0, _slicedToArray2['default'])(_useState, 2),
    frame = _useState2[0],
    setFrame = _useState2[1];

  var spinner = _cliSpinners['default'][type];
  (0, _react.useEffect)(
    function () {
      var timer = setInterval(function () {
        setFrame(function (previousFrame) {
          var isLastFrame = previousFrame === spinner.frames.length - 1;
          return isLastFrame ? 0 : previousFrame + 1;
        });
      }, spinner.interval);
      return function () {
        clearInterval(timer);
      };
    },
    [spinner],
  );
  return /*#__PURE__*/ _react['default'].createElement(
    _ink.Box,
    null,
    /*#__PURE__*/ _react['default'].createElement(
      _ink.Box,
      {
        marginRight: '1',
      },
      /*#__PURE__*/ _react['default'].createElement(_ink.Text, props, spinner.frames[frame]),
    ),
    children,
  );
};

Spinner.propTypes = {
  type: _propTypes['default'].string,
};
Spinner.defaultProps = {
  type: 'dots',
};
var _default = Spinner;
exports['default'] = _default;
