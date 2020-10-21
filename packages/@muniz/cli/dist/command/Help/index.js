"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var _CommandTextList = _interopRequireDefault(require("../Components/CommandTextList"));

// import { default as pluginI18n } from '@muniz/muniz-plugin-i18n';
// const i18n = pluginI18n.i18n();
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
  return /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    flexDirection: "column",
    paddingTop: 1
  }, header && /*#__PURE__*/_react["default"].createElement(_ink.Text, null, header), usages.length > 0 && /*#__PURE__*/_react["default"].createElement(_CommandTextList["default"], {
    data: usages,
    label: "Usage",
    labelColor: "blue"
  }), commands.length > 0 && /*#__PURE__*/_react["default"].createElement(_CommandTextList["default"], {
    data: commands,
    label: "Command",
    labelColor: "blue"
  }), options.length > 0 && /*#__PURE__*/_react["default"].createElement(_CommandTextList["default"], {
    data: options,
    label: "Options",
    labelColor: "#FF8C00"
  }), otherOptions.length > 0 && /*#__PURE__*/_react["default"].createElement(_CommandTextList["default"], {
    data: otherOptions,
    label: "Other Options",
    labelColor: "#FF8C00"
  }), examples.length > 0 && /*#__PURE__*/_react["default"].createElement(_CommandTextList["default"], {
    data: examples,
    label: "Examples",
    labelColor: "yellow"
  }), footer && /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    marginTop: 1
  }));
};

var _default = Help;
exports["default"] = _default;