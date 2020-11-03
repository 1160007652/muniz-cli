'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _react = _interopRequireDefault(require('react'));

var _ink = require('ink');

var _inkUi = require('@muniz/ink-ui');

var _lowdb = require('../../lib/lowdb.js');

var MunizConfig = require('../../configs/system.json');
/**
 * @muniz
 * @type react
 * @description 切换多语言
 */

var Locale = function Locale(props) {
  var _useApp = (0, _ink.useApp)(),
    exit = _useApp.exit;
  /**
   * 多语言选中事件
   */

  var handleOnBlur = function handleOnBlur(language) {
    _lowdb.lowdbAction.setLanguageLocale({
      language: language,
    });

    setTimeout(function () {
      exit();
    }, 100);
  };

  return /*#__PURE__*/ _react['default'].createElement(
    _ink.Box,
    {
      flexDirection: 'column',
      marginBottom: '1',
    },
    /*#__PURE__*/ _react['default'].createElement(
      _ink.Box,
      {
        marginTop: '1',
        flexDirection: 'column',
      },
      /*#__PURE__*/ _react['default'].createElement(
        _ink.Text,
        {
          color: 'green',
        },
        '\u76EE\u524D\u652F\u6301 2 \u79CD\u591A\u8BED\u8A00\uFF1A',
      ),
      /*#__PURE__*/ _react['default'].createElement(
        _ink.Box,
        {
          flexDirection: 'column',
          marginTop: '1',
          marginBottom: '1',
        },
        /*#__PURE__*/ _react['default'].createElement(
          _inkUi.Select,
          {
            onBlur: function onBlur() {
              handleOnBlur('zhCN');
            },
          },
          /*#__PURE__*/ _react['default'].createElement(_ink.Text, null, '\u4E2D\u6587'),
        ),
        /*#__PURE__*/ _react['default'].createElement(
          _inkUi.Select,
          {
            onBlur: function onBlur() {
              handleOnBlur('enUS');
            },
          },
          /*#__PURE__*/ _react['default'].createElement(_ink.Text, null, '\u82F1\u6587'),
        ),
      ),
      /*#__PURE__*/ _react['default'].createElement(
        _ink.Text,
        {
          color: 'yellow',
        },
        '\u64CD\u4F5C\uFF1A\u6309\u4E0B tab \u952E \u5207\u6362\uFF0CEnter \u952E \u6267\u884C',
      ),
    ),
  );
};

var _default = Locale;
exports['default'] = _default;
