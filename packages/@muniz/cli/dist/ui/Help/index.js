'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _react = _interopRequireDefault(require('react'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _ink = require('ink');

var _CommandLabel = _interopRequireDefault(require('../Components/CommandLabel'));

var _CommandTextList = _interopRequireDefault(require('../Components/CommandTextList'));

var Help = function Help(_ref) {
  var data = _ref.data;
  var header = data.header,
    footer = data.footer,
    _data$usages = data.usages,
    usages = _data$usages === void 0 ? [] : _data$usages,
    _data$commands = data.commands,
    commands = _data$commands === void 0 ? [] : _data$commands,
    _data$options = data.options,
    options = _data$options === void 0 ? [] : _data$options,
    _data$otherOptions = data.otherOptions,
    otherOptions = _data$otherOptions === void 0 ? [] : _data$otherOptions,
    _data$examples = data.examples,
    examples = _data$examples === void 0 ? [] : _data$examples;
  return /*#__PURE__*/ _react['default'].createElement(
    _ink.Box,
    {
      flexDirection: 'column',
      paddingTop: 1,
    },
    header && /*#__PURE__*/ _react['default'].createElement(_ink.Text, null, header),
    usages.length > 0 &&
      /*#__PURE__*/ _react['default'].createElement(
        _CommandLabel['default'],
        {
          color: 'blue',
        },
        'Usage',
      ),
    usages.length > 0 &&
      /*#__PURE__*/ _react['default'].createElement(_CommandTextList['default'], {
        data: usages,
      }),
    commands.length > 0 &&
      /*#__PURE__*/ _react['default'].createElement(
        _CommandLabel['default'],
        {
          color: 'blue',
        },
        'Command',
      ),
    commands.length > 0 &&
      /*#__PURE__*/ _react['default'].createElement(_CommandTextList['default'], {
        data: commands,
      }),
    options.length > 0 &&
      /*#__PURE__*/ _react['default'].createElement(
        _CommandLabel['default'],
        {
          color: '#FF8C00',
        },
        'Options',
      ),
    options.length > 0 &&
      /*#__PURE__*/ _react['default'].createElement(_CommandTextList['default'], {
        data: options,
      }),
    otherOptions.length > 0 &&
      /*#__PURE__*/ _react['default'].createElement(
        _CommandLabel['default'],
        {
          color: '#FF8C00',
        },
        'Other Options',
      ),
    otherOptions.length > 0 &&
      /*#__PURE__*/ _react['default'].createElement(_CommandTextList['default'], {
        data: otherOptions,
      }),
    examples.length > 0 &&
      /*#__PURE__*/ _react['default'].createElement(
        _CommandLabel['default'],
        {
          color: 'yellow',
        },
        'Examples',
      ),
    examples.length > 0 &&
      /*#__PURE__*/ _react['default'].createElement(_CommandTextList['default'], {
        data: [
          {
            command: '$ create pc_test ',
            desc: '创建一个 pc_test 项目工程 ',
          },
        ],
      }),
    footer &&
      /*#__PURE__*/ _react['default'].createElement(
        _ink.Box,
        {
          marginTop: 1,
        },
        /*#__PURE__*/ _react['default'].createElement(_ink.Text, null, footer),
      ),
  );
};

var _default = Help;
exports['default'] = _default;
