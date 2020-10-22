"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ink = require("ink");

var _CommandText = _interopRequireDefault(require("../CommandText"));

var _CommandLabel = _interopRequireDefault(require("../CommandLabel"));

var CommandTextList = function CommandTextList(_ref) {
  var data = _ref.data,
      labelColor = _ref.labelColor,
      label = _ref.label;
  var commandWidth = Math.max.apply(null, data.map(function (item) {
    var len = item.key.length;

    if (item === null || item === void 0 ? void 0 : item.alias) {
      len += ", -".concat(item.alias).length;
    }

    return len + 5;
  }));
  var defaultWidth = Math.max.apply(null, data.map(function (item) {
    var len = 0;

    if (['Options', 'Other Options'].includes(label)) {
      len += (item === null || item === void 0 ? void 0 : item["default"]) ? "Default: ".concat(item["default"], " ").length : 0;
    }

    return len + 5;
  }));
  var typeWidth = Math.max.apply(null, data.map(function (item) {
    var len = 0;

    if (['Options', 'Other Options'].includes(label)) {
      len += (item === null || item === void 0 ? void 0 : item.type) ? "Type: ".concat(item.type, " ").length : 0;
    }

    return len + 5;
  }));
  return /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    marginLeft: 2,
    flexDirection: "column"
  }, /*#__PURE__*/_react["default"].createElement(_CommandLabel["default"], {
    color: labelColor
  }, label), data.map(function (item, index) {
    return /*#__PURE__*/_react["default"].createElement(_CommandText["default"], {
      key: index,
      data: item,
      commandWidth: commandWidth,
      defaultWidth: defaultWidth,
      typeWidth: typeWidth,
      label: label
    });
  }));
};

var _default = CommandTextList;
exports["default"] = _default;