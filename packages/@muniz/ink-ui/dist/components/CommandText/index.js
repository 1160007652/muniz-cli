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
    commandWidth = _ref.commandWidth,
    defaultWidth = _ref.defaultWidth,
    typeWidth = _ref.typeWidth,
    label = _ref.label;
  return /*#__PURE__*/ _react['default'].createElement(
    _ink.Box,
    {
      marginLeft: 2,
      flexDirection: 'row',
    },
    ['help_options', 'help_other_options'].includes(label)
      ? /*#__PURE__*/ _react['default'].createElement(
          _ink.Box,
          null,
          /*#__PURE__*/ _react['default'].createElement(
            _ink.Box,
            {
              width: commandWidth,
            },
            /*#__PURE__*/ _react['default'].createElement(_ink.Text, null, '--'.concat(data.key)),
            /*#__PURE__*/ _react['default'].createElement(
              _ink.Text,
              null,
              (data === null || data === void 0 ? void 0 : data.alias) && ', -'.concat(data.alias),
            ),
          ),
          /*#__PURE__*/ _react['default'].createElement(
            _ink.Box,
            {
              width: defaultWidth,
            },
            ![undefined, ''].includes(data === null || data === void 0 ? void 0 : data['default']) &&
              /*#__PURE__*/ _react['default'].createElement(
                _ink.Text,
                {
                  color: '#0dbb79',
                },
                ' Default: '.concat(data['default'], ' '),
              ),
          ),
          (data === null || data === void 0 ? void 0 : data.type)
            ? /*#__PURE__*/ _react['default'].createElement(
                _ink.Box,
                {
                  width: typeWidth,
                },
                /*#__PURE__*/ _react['default'].createElement(_ink.Text, null, ' Type: '.concat(data.type, ' ')),
              )
            : /*#__PURE__*/ _react['default'].createElement(_ink.Text, null),
        )
      : /*#__PURE__*/ _react['default'].createElement(
          _ink.Box,
          {
            width: commandWidth,
          },
          /*#__PURE__*/ _react['default'].createElement(_ink.Text, null, data.key),
        ),
    /*#__PURE__*/ _react['default'].createElement(
      _ink.Text,
      {
        dimColor: true,
      },
      data.description,
    ),
  );
};

var _default = CommandText;
exports['default'] = _default;
