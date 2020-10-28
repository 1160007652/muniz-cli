'use strict';

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard');

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _slicedToArray2 = _interopRequireDefault(require('@babel/runtime/helpers/slicedToArray'));

var _common = require('@muniz/common');

var _propTypes = _interopRequireDefault(require('prop-types'));

var _reactHookForm = require('react-hook-form');

var yup = _interopRequireWildcard(require('yup'));

// import { yupResolver } from '@hookform/resolvers';
var TextInput = _common.InkUI.TextInput,
  Button = _common.InkUI.Button,
  ButtonGroup = _common.InkUI.ButtonGroup;
var Box = _common.Ink.Box,
  Text = _common.Ink.Text,
  useApp = _common.Ink.useApp,
  useFocusManager = _common.Ink.useFocusManager;
var useState = _common.React.useState; // 表单验证器规则

var schema = yup.object().shape({
  name: yup.string().required(),
  desc: yup.string().required(),
  telmplate: yup.string().required(),
}); // 创建指令

var Create = function Create(props) {
  var _useFocusManager = useFocusManager(),
    focusNext = _useFocusManager.focusNext;

  var _useApp = useApp(),
    exit = _useApp.exit; // 执行步骤

  var _useState = useState({
      cloneGit: false,
      help: false,
    }),
    _useState2 = (0, _slicedToArray2['default'])(_useState, 2),
    step = _useState2[0],
    setStep = _useState2[1]; // 表单收集

  var _useForm = (0, _reactHookForm.useForm)({
      reValidateMode: 'onChange',
      mode: 'all', // resolver: yupResolver(schema),
    }),
    control = _useForm.control,
    errors = _useForm.errors,
    reset = _useForm.reset,
    handleSubmit = _useForm.handleSubmit,
    getValues = _useForm.getValues,
    setValue = _useForm.setValue; // 提交表单数据

  var onSubmit = function onSubmit(data) {
    setStep(function (state) {
      state.cloneGit = true;
      state.help = true;
      return state;
    }); // exit();
  };

  return /*#__PURE__*/ _common.React.createElement(
    Box,
    {
      flexDirection: 'column',
    },
    /*#__PURE__*/ _common.React.createElement(
      Box,
      {
        marginBottom: '1',
      },
      /*#__PURE__*/ _common.React.createElement(
        Text,
        {
          color: 'green',
        },
        'Step-1: \u6536\u96C6\u7528\u6237\u8F93\u5165\u4FE1\u606F',
      ),
    ),
    /*#__PURE__*/ _common.React.createElement(_reactHookForm.Controller, {
      control: control,
      name: 'name',
      defaultValue: '',
      render: function render(_ref) {
        var _errors$name;

        var onChange = _ref.onChange,
          onBlur = _ref.onBlur,
          value = _ref.value;
        return /*#__PURE__*/ _common.React.createElement(TextInput, {
          label: '\u540D\u79F0\uFF1A',
          value: value,
          placeHolder: '\u8BF7\u8F93\u5165\u9879\u76EE\u540D\u79F0',
          onChange: onChange,
          onBlur: onBlur,
          error: (_errors$name = errors.name) === null || _errors$name === void 0 ? void 0 : _errors$name.message,
        });
      },
    }),
    /*#__PURE__*/ _common.React.createElement(_reactHookForm.Controller, {
      control: control,
      name: 'desc',
      defaultValue: '',
      render: function render(_ref2) {
        var _errors$desc;

        var onChange = _ref2.onChange,
          onBlur = _ref2.onBlur,
          value = _ref2.value;
        return /*#__PURE__*/ _common.React.createElement(TextInput, {
          label: '\u63CF\u8FF0\uFF1A',
          value: value,
          placeHolder: '\u8BF7\u8F93\u5165\u63CF\u8FF0\u4FE1\u606F',
          onChange: onChange,
          onBlur: onBlur,
          error: (_errors$desc = errors.desc) === null || _errors$desc === void 0 ? void 0 : _errors$desc.message,
        });
      },
    }),
    /*#__PURE__*/ _common.React.createElement(_reactHookForm.Controller, {
      control: control,
      name: 'telmplate',
      defaultValue: '',
      render: function render(_ref3) {
        var _errors$telmplate;

        var onChange = _ref3.onChange,
          onBlur = _ref3.onBlur,
          value = _ref3.value;
        return /*#__PURE__*/ _common.React.createElement(TextInput, {
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
    !step.cloneGit &&
      /*#__PURE__*/ _common.React.createElement(
        ButtonGroup,
        {
          marginTop: '1',
        },
        /*#__PURE__*/ _common.React.createElement(
          Button,
          {
            marginRight: '3',
            disabled: Object.keys(errors).length > 0,
            interval: '2',
            onBlur: handleSubmit(onSubmit),
          },
          '\u786E\u8BA4',
        ),
        /*#__PURE__*/ _common.React.createElement(
          Button,
          {
            interval: 2,
            marginRight: '3',
            onBlur: function onBlur() {
              exit();
            },
          },
          '\u53D6\u6D88',
        ),
        /*#__PURE__*/ _common.React.createElement(
          Button,
          {
            interval: 2,
            onBlur: function onBlur() {
              reset();
              setStep(function (state) {
                state.cloneGit = false;
                return state;
              });
              setTimeout(function () {
                focusNext();
              }, 100);
            },
          },
          '\u91CD\u7F6E',
        ),
      ),
    step.cloneGit &&
      /*#__PURE__*/ _common.React.createElement(
        Box,
        {
          marginTop: '1',
          flexDirection: 'column',
        },
        /*#__PURE__*/ _common.React.createElement(
          Text,
          {
            color: 'green',
          },
          'Step-2: \u5F00\u59CB\u514B\u9686\u6A21\u7248\u5DE5\u7A0B',
        ),
        /*#__PURE__*/ _common.React.createElement(
          Box,
          null,
          /*#__PURE__*/ _common.React.createElement(Text, null, '\u514B\u9686\u5B8C\u6BD5\uFF1A100%'),
        ),
      ),
    step.help &&
      /*#__PURE__*/ _common.React.createElement(
        Box,
        {
          marginTop: '1',
          flexDirection: 'column',
        },
        /*#__PURE__*/ _common.React.createElement(
          Text,
          {
            color: 'green',
          },
          'Step-3: \u4F7F\u7528\u5E2E\u52A9',
        ),
        /*#__PURE__*/ _common.React.createElement(Text, null, '\u8FDB\u5165\u9879\u76EE: cd testProject'),
        /*#__PURE__*/ _common.React.createElement(Text, null, '\u8FDB\u5165\u9879\u76EE: npm install'),
      ),
  );
};

Create.propTypes = {
  /**
   * @muniz
   * @description falgs哈哈
   */
  flags: _propTypes['default'].string,

  /**
   * @muniz
   * @description Number类型转换
   */
  count: _propTypes['default'].number,

  /**
   * @muniz
   * @description 生成项目的名称
   * @alias n
   */
  isGit: _propTypes['default'].bool,
};
Create.defaultProps = {
  flags: 'wowowoowqqqqqqq',
  isGit: false,
  count: 1,
};
var _default = Create;
exports['default'] = _default;
