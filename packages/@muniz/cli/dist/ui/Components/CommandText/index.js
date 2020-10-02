'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _react = _interopRequireDefault(require('react'));

var _ink = require('ink');

var CommandText = function CommandText(_ref) {
  var data = _ref.data,
    width = _ref.width;
  return /*#__PURE__*/ _react['default'].createElement(
    _ink.Box,
    {
      marginLeft: 2,
      flexDirection: 'row',
    },
    /*#__PURE__*/ _react['default'].createElement(
      _ink.Box,
      {
        width: width,
      },
      /*#__PURE__*/ _react['default'].createElement(_ink.Text, null, data.command, '\xA0\xA0'),
      ![undefined, ''].includes(data === null || data === void 0 ? void 0 : data['default']) &&
        /*#__PURE__*/ _react['default'].createElement(
          _ink.Text,
          {
            color: '#0dbb79',
          },
          ' Default: '.concat(data['default'], ' '),
          '\xA0\xA0',
        ),
    ),
    /*#__PURE__*/ _react['default'].createElement(
      _ink.Text,
      {
        dimColor: true,
      },
      data.desc,
    ),
  );
};

var _default = CommandText;
exports['default'] = _default;
