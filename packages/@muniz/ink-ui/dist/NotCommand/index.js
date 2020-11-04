'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _react = _interopRequireDefault(require('react'));

var _ink = require('ink');

var _locales = _interopRequireDefault(require('../configs/locales'));

var _cliI18n = _interopRequireDefault(require('@muniz/cli-i18n'));

var NotCommand = function NotCommand(props) {
  var argv = props.argv,
    env = props.env,
    _props$isExistPlugin = props.isExistPlugin,
    isExistPlugin = _props$isExistPlugin === void 0 ? false : _props$isExistPlugin,
    _props$locale = props.locale,
    locale = _props$locale === void 0 ? 'zhCN' : _props$locale;

  _cliI18n['default'].setLocale({
    locale: locale,
  });

  _cliI18n['default'].setlanguages({
    languages: _locales['default'],
  });
  /**
   * 可以在这里做 命令 推荐
   */

  var cliNotCommand = function cliNotCommand() {
    return /*#__PURE__*/ _react['default'].createElement(
      _ink.Box,
      {
        flexDirection: 'column',
        paddingTop: 1,
      },
      /*#__PURE__*/ _react['default'].createElement(
        _ink.Text,
        null,
        _cliI18n['default'].getLocale('not_command_cli_title', {
          command: argv.command[0],
        }),
      ),
      /*#__PURE__*/ _react['default'].createElement(
        _ink.Box,
        {
          marginTop: '1',
          marginBottom: '1',
        },
        /*#__PURE__*/ _react['default'].createElement(
          _ink.Text,
          null,
          _cliI18n['default'].getLocale('not_command_tips'),
        ),
      ),
      /*#__PURE__*/ _react['default'].createElement(
        _ink.Box,
        {
          marginBottom: '1',
        },
        /*#__PURE__*/ _react['default'].createElement(
          _ink.Text,
          {
            color: 'green',
          },
          _cliI18n['default'].getLocale('not_command_doctor_tips'),
        ),
      ),
      /*#__PURE__*/ _react['default'].createElement(
        _ink.Text,
        {
          color: 'green',
        },
        ''.concat(_cliI18n['default'].getLocale('not_command_name'), ': muniz add xxx'),
      ),
    );
  };

  var pluginNotCommand = function pluginNotCommand() {
    return /*#__PURE__*/ _react['default'].createElement(
      _ink.Box,
      {
        flexDirection: 'column',
        paddingTop: 1,
      },
      /*#__PURE__*/ _react['default'].createElement(
        _ink.Text,
        null,
        isExistPlugin
          ? /*#__PURE__*/ _react['default'].createElement(
              _ink.Text,
              null,
              _cliI18n['default'].getLocale('not_command_plugin_sub_title', {
                plugin: argv.command[0],
                command: argv.command[1],
              }),
            )
          : /*#__PURE__*/ _react['default'].createElement(
              _ink.Text,
              null,
              _cliI18n['default'].getLocale('not_command_plugin_title', {
                plugin: argv.command[0],
              }),
            ),
      ),
      /*#__PURE__*/ _react['default'].createElement(
        _ink.Box,
        {
          marginTop: '1',
          marginBottom: '1',
        },
        /*#__PURE__*/ _react['default'].createElement(
          _ink.Text,
          null,
          _cliI18n['default'].getLocale('not_command_tips'),
        ),
      ),
      /*#__PURE__*/ _react['default'].createElement(
        _ink.Box,
        {
          marginBottom: '1',
        },
        /*#__PURE__*/ _react['default'].createElement(
          _ink.Text,
          {
            color: 'green',
          },
          _cliI18n['default'].getLocale('not_command_doctor_tips'),
        ),
      ),
      /*#__PURE__*/ _react['default'].createElement(
        _ink.Text,
        {
          color: 'green',
        },
        ''.concat(_cliI18n['default'].getLocale('not_command_name'), ': muniz add xxx'),
      ),
    );
  };

  return env.command === 'cli' ? cliNotCommand() : pluginNotCommand();
};

var _default = NotCommand;
exports['default'] = _default;
