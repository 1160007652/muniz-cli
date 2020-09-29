"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _react = _interopRequireWildcard(require("react"));

var _ink = require("ink");

var _reactRouter = require("react-router");

var _reactHookForm = require("react-hook-form");

var _inkUi = require("@muniz/ink-ui");

var Create = function Create() {
  var _useForm = (0, _reactHookForm.useForm)({
    reValidateMode: 'onChange',
    mode: 'onChange'
  }),
      control = _useForm.control,
      errors = _useForm.errors,
      getValues = _useForm.getValues,
      watch = _useForm.watch;

  var xxx = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // await trigger('desc');
              // setError('desc', {
              //   type: 'required',
              //   message: 'Dont Forget Your Username Should Be Cool!',
              // });
              console.log(errors);

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function xxx() {
      return _ref.apply(this, arguments);
    };
  }();

  return /*#__PURE__*/_react["default"].createElement(_ink.Box, {
    flexDirection: "column"
  }, /*#__PURE__*/_react["default"].createElement(_reactHookForm.Controller, {
    control: control,
    name: "desc",
    defaultValue: "",
    rules: {
      required: true
    },
    render: function render(_ref2) {
      var onChange = _ref2.onChange,
          onBlur = _ref2.onBlur,
          value = _ref2.value;
      return /*#__PURE__*/_react["default"].createElement(_inkUi.TextInput, {
        label: "\u63CF\u8FF0\uFF1A",
        value: value,
        placeHolder: "\u8BF7\u8F93\u5165\u63CF\u8FF0\u4FE1\u606F",
        onChange: onChange
      });
    }
  }), /*#__PURE__*/_react["default"].createElement(_ink.Text, null, errors.desc && 'First name is required'), /*#__PURE__*/_react["default"].createElement(_reactHookForm.Controller, {
    control: control,
    name: "telmplate",
    defaultValue: "",
    rules: {
      required: true
    },
    render: function render(_ref3) {
      var onChange = _ref3.onChange,
          onBlur = _ref3.onBlur,
          value = _ref3.value;
      return /*#__PURE__*/_react["default"].createElement(_inkUi.TextInput, {
        label: "\u6A21\u7248\uFF1A",
        value: value,
        placeHolder: "\u8BF7\u9009\u62E9\u521B\u5EFA\u6A21\u7248\u7C7B\u578B",
        onChange: onChange
      });
    }
  }), /*#__PURE__*/_react["default"].createElement(_ink.Text, null, errors.telmplate && 'First name is required'));
};

var _default = Create;
exports["default"] = _default;