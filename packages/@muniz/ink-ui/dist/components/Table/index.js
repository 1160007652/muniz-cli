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

var _table = require('table');

/**
 * Table 容器
 */
var Table = function Table(_ref) {
  var data = _ref.data,
    config = _ref.config,
    children = _ref.children,
    props = (0, _objectWithoutProperties2['default'])(_ref, ['data', 'config', 'children']);
  return /*#__PURE__*/ _react['default'].createElement(
    _ink.Box,
    props,
    /*#__PURE__*/ _react['default'].createElement(
      _ink.Text,
      null,
      config ? (0, _table.table)(data, config) : (0, _table.table)(data),
    ),
    children,
  );
};

Table.propTypes = {
  data: _propTypes['default'].array.isRequired,
  config: _propTypes['default'].object,
};
Table.defaultProps = {
  data: [],
  config: null,
};
var _default = Table;
exports['default'] = _default;
