"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var _CommandTextList = _interopRequireDefault(require("../Components/CommandTextList"));

var _CommandLabel = _interopRequireDefault(require("../Components/CommandLabel"));

// import { default as pluginI18n } from '@muniz/muniz-plugin-i18n';
// const i18n = pluginI18n.i18n();
var Help = function Help(_ref) {
  var _data$options;

  var data = _ref.data,
      usage = _ref.usage,
      show = _ref.show;
  var usages = [{
    key: usage,
    description: ''
  }];
  var otherOptions = [{
    key: 'help',
    alias: 'h',
    description: '显示帮助文档'
  }, {
    key: 'version',
    alias: 'v',
    description: '显示版本号'
  }];
  return /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    flexDirection: "column",
    paddingTop: 1
  }, show === 'options' && /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    marginLeft: 2,
    flexDirection: "column"
  }, /*#__PURE__*/_react["default"].createElement(_ink.Text, null, data.description)), /*#__PURE__*/_react["default"].createElement(_CommandTextList["default"], {
    data: usages,
    label: "Usage",
    labelColor: "blue"
  }), show === 'command' && data.length > 0 && /*#__PURE__*/_react["default"].createElement(_CommandTextList["default"], {
    data: data,
    label: "Command",
    labelColor: "blue"
  }), show === 'options' && (data === null || data === void 0 ? void 0 : (_data$options = data.options) === null || _data$options === void 0 ? void 0 : _data$options.length) > 0 && /*#__PURE__*/_react["default"].createElement(_CommandTextList["default"], {
    data: data.options,
    label: "Options",
    labelColor: "#FF8C00"
  }), /*#__PURE__*/_react["default"].createElement(_CommandTextList["default"], {
    data: otherOptions,
    label: "Other Options",
    labelColor: "#FF8C00"
  }), /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    marginBottom: 1
  }));
};

var _default = Help;
exports["default"] = _default;