"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var _reactRouter = require("react-router");

var _inkUi = require("@muniz/ink-ui");

var Home = function Home() {
  var location = (0, _reactRouter.useLocation)();
  var history = (0, _reactRouter.useHistory)();
  var params = (0, _reactRouter.useParams)();
  var match = (0, _reactRouter.useRouteMatch)();
  console.log(location, params, match);
  return /*#__PURE__*/_react["default"].createElement(_ink.Text, null, /*#__PURE__*/_react["default"].createElement(_inkUi.TextInput, null, " sssss "), " \u6DFB\u52A0\u63D2\u4EF6\u547D\u4EE4");
};

var _default = Home;
exports["default"] = _default;