'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _react = _interopRequireDefault(require('react'));

var _ink = require('ink');

var CommandText = function CommandText(_ref) {
  var data = _ref.data;
  return /*#__PURE__*/ _react['default'].createElement(
    _ink.Box,
    {
      marginLeft: 2,
      flexDirection: 'column',
    },
    /*#__PURE__*/ _react['default'].createElement(
      _ink.Text,
      null,
      /*#__PURE__*/ _react['default'].createElement(_ink.Text, null, data.command),
      /*#__PURE__*/ _react['default'].createElement(
        _ink.Text,
        {
          dimColor: true,
        },
        data.desc,
      ),
    ),
  );
};

var _default = CommandText;
exports['default'] = _default;
