"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ink = require("ink");

var _i18n = _interopRequireDefault(require("../configs/i18n"));

var _CommandTextList = _interopRequireDefault(require("../Components/CommandTextList"));

var Help = function Help(_ref) {
  var _commands$options;

  var data = _ref.data,
      show = _ref.show,
      _ref$locale = _ref.locale,
      locale = _ref$locale === void 0 ? 'zhCN' : _ref$locale;
  var usage = data.usage,
      commands = data.commands,
      otherOptions = data.otherOptions;

  _i18n["default"].setLocale({
    locale: locale
  });

  return /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    flexDirection: "column",
    paddingTop: 1
  }, show === 'options' && /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    marginLeft: 2,
    flexDirection: "column"
  }, /*#__PURE__*/_react["default"].createElement(_ink.Text, null, commands.description)), /*#__PURE__*/_react["default"].createElement(_CommandTextList["default"], {
    data: [usage],
    label: "help_usage",
    labelColor: "blue"
  }), show === 'command' && commands.length > 0 && /*#__PURE__*/_react["default"].createElement(_CommandTextList["default"], {
    data: commands,
    label: "help_command",
    labelColor: "blue"
  }), show === 'options' && (commands === null || commands === void 0 ? void 0 : (_commands$options = commands.options) === null || _commands$options === void 0 ? void 0 : _commands$options.length) > 0 && /*#__PURE__*/_react["default"].createElement(_CommandTextList["default"], {
    data: commands.options,
    label: "help_options",
    labelColor: "#73C991"
  }), /*#__PURE__*/_react["default"].createElement(_CommandTextList["default"], {
    data: otherOptions,
    label: "help_other_options",
    labelColor: "#73C991"
  }), /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    marginBottom: 1
  }));
};

var _default = Help;
exports["default"] = _default;