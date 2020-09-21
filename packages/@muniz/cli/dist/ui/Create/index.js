"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ink = require("ink");

var _reactRouter = require("react-router");

var _Home = _interopRequireDefault(require("./Home"));

var _Create = _interopRequireDefault(require("./Create"));

var Create = function Create(context) {
  var program = context.program;
  var input = program.input,
      flags = program.flags;
  console.log(flags);
  var command = input.length > 0 ? input[0] : 'help';
  return /*#__PURE__*/_react["default"].createElement(_reactRouter.StaticRouter, {
    location: {
      pathname: command,
      state: flags
    },
    context: context
  }, /*#__PURE__*/_react["default"].createElement(_reactRouter.Switch, null, /*#__PURE__*/_react["default"].createElement(_reactRouter.Route, {
    exact: true,
    path: "help",
    component: _Home["default"]
  }), /*#__PURE__*/_react["default"].createElement(_reactRouter.Route, {
    path: "create",
    component: _Create["default"]
  }))); // return <Text color="green">插件中</Text>;
};

Create.propTypes = {
  input: _propTypes["default"].array,
  flags: _propTypes["default"].object
};
Create.defaultProps = {
  input: [],
  flags: null
};
var _default = Create;
exports["default"] = _default;