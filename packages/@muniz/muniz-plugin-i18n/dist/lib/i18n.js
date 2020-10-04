'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.i18n = exports.initI18nLocales = void 0;

var _reactIntlUniversal = _interopRequireDefault(require('react-intl-universal'));

var initI18nLocales = function initI18nLocales(_ref) {
  var _ref$locales = _ref.locales,
    locales = _ref$locales === void 0 ? null : _ref$locales;

  _reactIntlUniversal['default'].init({
    currentLocale: 'zhCN',
    locales: locales,
  });
};

exports.initI18nLocales = initI18nLocales;
var i18n = _reactIntlUniversal['default'];
exports.i18n = i18n;
