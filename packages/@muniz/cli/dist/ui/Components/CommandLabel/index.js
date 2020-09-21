'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _react = _interopRequireDefault(require('react'));

var _ink = require('ink');

var CommandLabel = function CommandLabel(_ref) {
  var color = _ref.color,
    children = _ref.children;
  return /*#__PURE__*/ _react['default'].createElement(
    _ink.Box,
    {
      paddingTop: 1,
      paddingBottom: 1,
    },
    /*#__PURE__*/ _react['default'].createElement(
      _ink.Text,
      {
        bold: true,
        color: color,
      },
      children,
    ),
  );
};

var _default = CommandLabel;
exports['default'] = _default;
