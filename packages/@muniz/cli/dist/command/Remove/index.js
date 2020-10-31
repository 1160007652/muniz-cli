'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _react = _interopRequireDefault(require('react'));

var _ink = require('ink');

var _lowdb = require('../../lib/lowdb.js');

/**
 * @muniz
 * @description 删除插件
 */
var Remove = function Remove() {
  // lowdbAction.removePluginPkg();
  return /*#__PURE__*/ _react['default'].createElement(
    _ink.Box,
    null,
    /*#__PURE__*/ _react['default'].createElement(_ink.Text, null, '\u5220\u9664\u63D2\u4EF6\u547D\u4EE4'),
  );
};

var _default = Remove;
exports['default'] = _default;
