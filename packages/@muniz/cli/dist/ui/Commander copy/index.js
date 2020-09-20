"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ink = require("ink");

var Counter = function Counter(_ref) {
  var name = _ref.name;

  var _useState = (0, _react.useState)(0),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      counter = _useState2[0],
      setCounter = _useState2[1];

  (0, _react.useEffect)(function () {
    var timer = setInterval(function () {
      setCounter(function (previousCounter) {
        return previousCounter + 1;
      });
    }, 100);
    return function () {
      clearInterval(timer);
    };
  }, []);
  return /*#__PURE__*/_react["default"].createElement(_ink.Text, {
    color: "green"
  }, counter, " tests passed ", name);
};

Counter.propTypes = {
  name: _propTypes["default"].string
};
Counter.defaultProps = {
  name: '胡丽娜'
};
var _default = Counter;
exports["default"] = _default;