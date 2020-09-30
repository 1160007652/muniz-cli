'use strict';

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _react = _interopRequireWildcard(require('react'));

var _ink = require('ink');

var _reactRouter = require('react-router');

var _reactHookForm = require('react-hook-form');

var _resolvers = require('@hookform/resolvers');

var yup = _interopRequireWildcard(require('yup'));

var _inkUi = require('@muniz/ink-ui');

// 表单验证器规则
var schema = yup.object().shape({
  desc: yup.string().required(),
  telmplate: yup.number('请输入数字').positive('必须是正整数').integer('数字').required('必填项'),
}); // 提交表单数据

var onSubmit = function onSubmit(data) {
  return console.log(data);
}; // 创建指令

var Create = function Create() {
  var _useFocusManager = (0, _ink.useFocusManager)(),
    focusNext = _useFocusManager.focusNext;

  var _useForm = (0, _reactHookForm.useForm)({
      reValidateMode: 'onChange',
      mode: 'onBlur',
      resolver: (0, _resolvers.yupResolver)(schema),
    }),
    control = _useForm.control,
    errors = _useForm.errors,
    reset = _useForm.reset,
    handleSubmit = _useForm.handleSubmit;

  return /*#__PURE__*/ _react['default'].createElement(
    _ink.Box,
    {
      flexDirection: 'column',
    },
    /*#__PURE__*/ _react['default'].createElement(_reactHookForm.Controller, {
      control: control,
      name: 'desc',
      defaultValue: '',
      render: function render(_ref) {
        var _errors$desc;

        var onChange = _ref.onChange,
          onBlur = _ref.onBlur,
          value = _ref.value;
        return /*#__PURE__*/ _react['default'].createElement(_inkUi.TextInput, {
          label: '\u63CF\u8FF0\uFF1A',
          value: value,
          placeHolder: '\u8BF7\u8F93\u5165\u63CF\u8FF0\u4FE1\u606F',
          onChange: onChange,
          onBlur: onBlur,
          error: (_errors$desc = errors.desc) === null || _errors$desc === void 0 ? void 0 : _errors$desc.message,
        });
      },
    }),
    /*#__PURE__*/ _react['default'].createElement(_reactHookForm.Controller, {
      control: control,
      name: 'telmplate',
      defaultValue: '',
      render: function render(_ref2) {
        var _errors$telmplate;

        var onChange = _ref2.onChange,
          onBlur = _ref2.onBlur,
          value = _ref2.value;
        return /*#__PURE__*/ _react['default'].createElement(_inkUi.TextInput, {
          type: 'number',
          label: '\u6A21\u7248\uFF1A',
          value: value,
          placeHolder: '\u8BF7\u9009\u62E9\u521B\u5EFA\u6A21\u7248\u7C7B\u578B',
          onChange: onChange,
          onBlur: onBlur,
          error:
            (_errors$telmplate = errors.telmplate) === null || _errors$telmplate === void 0
              ? void 0
              : _errors$telmplate.message,
        });
      },
    }),
    /*#__PURE__*/ _react['default'].createElement(
      _ink.Box,
      {
        marginTop: '1',
      },
      /*#__PURE__*/ _react['default'].createElement(
        _inkUi.Button,
        {
          marginRight: '3',
          interval: '2',
          onBlur: handleSubmit(onSubmit),
        },
        '\u786E\u8BA4',
      ),
      /*#__PURE__*/ _react['default'].createElement(
        _inkUi.Button,
        {
          interval: 2,
          marginRight: '3',
          onBlur: function onBlur() {
            process.exit();
          },
        },
        '\u53D6\u6D88',
      ),
      /*#__PURE__*/ _react['default'].createElement(
        _inkUi.Button,
        {
          interval: 2,
          onBlur: function onBlur() {
            reset();
            setTimeout(function () {
              focusNext();
            }, 100);
          },
        },
        '\u91CD\u7F6E',
      ),
    ),
  );
};

var _default = Create;
exports['default'] = _default;
