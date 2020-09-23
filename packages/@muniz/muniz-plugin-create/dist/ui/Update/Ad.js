"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var _reactRouter = require("react-router");

var Ad = function Ad() {
  var params = (0, _reactRouter.useLocation)();
  console.log(params);
  return /*#__PURE__*/_react["default"].createElement(_ink.Text, null, "\u5E7F\u544A --- ");
};

var _default = Ad;
exports["default"] = _default;