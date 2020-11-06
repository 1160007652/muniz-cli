"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _ink = require("ink");

var _inkUi = require("@muniz/ink-ui");

var _lowdb = require("../../lib/lowdb.js");

var _i18n = _interopRequireDefault(require("../../lib/i18n"));

/**
 * @muniz
 * @type react
 * @description help_list_desc
 */
var List = function List(props) {
  var _useState = (0, _react.useState)([[_i18n["default"].getLocale('list_command_table_head1'), _i18n["default"].getLocale('list_command_table_head2'), _i18n["default"].getLocale('list_command_table_head3')]]),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      pkgList = _useState2[0],
      setPkgList = _useState2[1];

  (0, _react.useEffect)(function () {
    var result = _lowdb.lowdbAction.getPluginPkgList();

    setPkgList(function (state) {
      return state.concat(result);
    });
  }, []);
  return /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    flexDirection: "column",
    marginTop: "1"
  }, /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    marginBottom: "1"
  }, /*#__PURE__*/_react["default"].createElement(_ink.Text, null, _i18n["default"].getLocale('list_command_title', {
    count: pkgList.length - 1
  }))), /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    flexDirection: "column"
  }, pkgList.length > 1 ? /*#__PURE__*/_react["default"].createElement(_inkUi.Table, {
    data: pkgList
  }) : /*#__PURE__*/_react["default"].createElement(_ink.Text, null, _i18n["default"].getLocale('list_command_empty_tips'))));
};

var _default = List;
exports["default"] = _default;