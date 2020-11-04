'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _classCallCheck2 = _interopRequireDefault(require('@babel/runtime/helpers/classCallCheck'));

var _createClass2 = _interopRequireDefault(require('@babel/runtime/helpers/createClass'));

var Locale = /*#__PURE__*/ (function () {
  function Locale() {
    (0, _classCallCheck2['default'])(this, Locale);
    this.languages = {};
    this.locale = '';
  }
  /**
   * 获取多语言文案
   * @param {string} name , 多语言key
   * @param {*} options , 多语言替换“占位符”配置
   */

  (0, _createClass2['default'])(Locale, [
    {
      key: 'getLocale',
      value: function getLocale(name, options) {
        var text = this.languages[this.locale][name];

        if (!text) {
          return this.getLocale('language_not_found', {
            name: name,
            locale: this.locale,
          });
        }

        var localText = text;

        if (/{.*?}/.test(localText)) {
          Object.keys(options || {}).forEach(function (key) {
            var reg = new RegExp('{'.concat(key, '}'), 'g');
            localText = localText.replace(reg, options[key]);
          });
        }

        return localText;
      },
      /**
       * 设置多语言
       * @param {object}} param
       * @param {string}} param.locale 多语言标识 ，如 zhCN、enUS
       */
    },
    {
      key: 'setLocale',
      value: function setLocale(_ref) {
        var locale = _ref.locale;
        this.locale = locale;
      },
      /**
       * 设置多语言数据集合
       * @param {object}} param
       * @param {object}} param.languages 多语言数据集合 ，如 {hello: '你好'}
       */
    },
    {
      key: 'setlanguages',
      value: function setlanguages(_ref2) {
        var languages = _ref2.languages;
        this.languages = languages;
      },
    },
  ]);
  return Locale;
})();

var _default = new Locale();

exports['default'] = _default;
