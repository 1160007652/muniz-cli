"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var _i18n = _interopRequireDefault(require("../configs/i18n"));

var Version = function Version(_ref) {
  var pkg = _ref.pkg,
      _ref$locale = _ref.locale,
      locale = _ref$locale === void 0 ? 'zhCN' : _ref$locale;
  var version = pkg.version,
      homepage = pkg.homepage,
      name = pkg.name;

  _i18n["default"].setLocale({
    locale: locale
  });

  return /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    flexDirection: "column",
    paddingTop: 1
  }, /*#__PURE__*/_react["default"].createElement(_ink.Text, null, "".concat(_i18n["default"].getLocale('version_plugin_name'), ": ").concat(name)), /*#__PURE__*/_react["default"].createElement(_ink.Text, null, "".concat(_i18n["default"].getLocale('version_current'), ": ").concat(version)), /*#__PURE__*/_react["default"].createElement(_ink.Text, null, "Git\uFF1A", homepage));
};

var _default = Version;
exports["default"] = _default;