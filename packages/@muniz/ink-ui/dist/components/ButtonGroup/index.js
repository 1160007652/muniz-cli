'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _extends2 = _interopRequireDefault(require('@babel/runtime/helpers/extends'));

var _objectWithoutProperties2 = _interopRequireDefault(require('@babel/runtime/helpers/objectWithoutProperties'));

var _react = _interopRequireDefault(require('react'));

var _ink = require('ink');

var ButtonGroup = function ButtonGroup(_ref) {
  var children = _ref.children,
    props = (0, _objectWithoutProperties2['default'])(_ref, ['children']);
  return /*#__PURE__*/ _react['default'].createElement(
    _ink.Box,
    (0, _extends2['default'])(
      {
        flexDirection: 'column',
      },
      props,
    ),
    /*#__PURE__*/ _react['default'].createElement(
      _ink.Box,
      null,
      /*#__PURE__*/ _react['default'].createElement(
        _ink.Text,
        {
          color: 'yellow',
        },
        '\u64CD\u4F5C\uFF1A\u6309\u4E0B tab \u952E \u5207\u6362\uFF0CEnter \u952E \u6267\u884C',
      ),
    ),
    /*#__PURE__*/ _react['default'].createElement(_ink.Box, null, children),
  );
};

var _default = ButtonGroup;
exports['default'] = _default;
