'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _react = _interopRequireDefault(require('react'));

var _ink = require('ink');

var _CommandText = _interopRequireDefault(require('../CommandText'));

var CommandTextList = function CommandTextList(_ref) {
  var data = _ref.data;
  return /*#__PURE__*/ _react['default'].createElement(
    _ink.Box,
    {
      marginLeft: 2,
      flexDirection: 'column',
    },
    data.map(function (item, index) {
      return /*#__PURE__*/ _react['default'].createElement(_CommandText['default'], {
        key: index,
        data: item,
      });
    }),
  );
};

var _default = CommandTextList;
exports['default'] = _default;
