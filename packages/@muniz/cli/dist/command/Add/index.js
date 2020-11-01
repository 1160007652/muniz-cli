'use strict';

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard');

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'));

var _defineProperty2 = _interopRequireDefault(require('@babel/runtime/helpers/defineProperty'));

var _asyncToGenerator2 = _interopRequireDefault(require('@babel/runtime/helpers/asyncToGenerator'));

var _slicedToArray2 = _interopRequireDefault(require('@babel/runtime/helpers/slicedToArray'));

var _react = _interopRequireWildcard(require('react'));

var _ink = require('ink');

var _propTypes = _interopRequireDefault(require('prop-types'));

var _inkUi = require('@muniz/ink-ui');

var _lowdb = require('../../lib/lowdb.js');

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        (0, _defineProperty2['default'])(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}

var execa = require('execa');
/**
 * @muniz
 * @type react
 * @description 添加插件
 */

var Add = function Add(props) {
  var input = props.input;

  var _useState = (0, _react.useState)(),
    _useState2 = (0, _slicedToArray2['default'])(_useState, 2),
    pkgList = _useState2[0],
    setPkgList = _useState2[1];

  var _useState3 = (0, _react.useState)('不能为空'),
    _useState4 = (0, _slicedToArray2['default'])(_useState3, 2),
    error = _useState4[0],
    setError = _useState4[1];

  var _useState5 = (0, _react.useState)(''),
    _useState6 = (0, _slicedToArray2['default'])(_useState5, 2),
    installFlag = _useState6[0],
    setInstallFlag = _useState6[1];

  var _useApp = (0, _ink.useApp)(),
    exit = _useApp.exit; // 执行步骤

  var _useState7 = (0, _react.useState)({
      install: false,
      help: false,
      spinnerFlag: false,
    }),
    _useState8 = (0, _slicedToArray2['default'])(_useState7, 2),
    step = _useState8[0],
    setStep = _useState8[1];

  function handleOnChnagePkg(data) {
    if (String(data).trim()) {
      var _shortName;

      var shortName = String(data.trim()).match(/.*?muniz-plugin-(.*?)$/);
      shortName =
        ((_shortName = shortName) === null || _shortName === void 0 ? void 0 : _shortName.length) > 1
          ? shortName[1]
          : '';

      if (!shortName) {
        setError(''.concat(data.trim(), ' : \u4E0D\u662F\u300C Muniz \u300D \u811A\u624B\u67B6\u63D2\u4EF6'));
      } else {
        setError('');
        setPkgList({
          shortName: shortName,
          pkgName: data.trim(),
        });
      }
    } else {
      setError('不能为空');
    }
  } // 开始安装 插件

  var handleInstallPkg = /*#__PURE__*/ (function () {
    var _ref = (0, _asyncToGenerator2['default'])(
      /*#__PURE__*/ _regenerator['default'].mark(function _callee() {
        return _regenerator['default'].wrap(function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                setStep(function (state) {
                  return _objectSpread(
                    _objectSpread({}, state),
                    {},
                    {
                      install: true,
                      spinnerFlag: true,
                    },
                  );
                }); // 调用安装命令

                execa
                  .command('npm install -g '.concat(pkgList.pkgName))
                  .then(function () {
                    // 向系统配置文件中，保存安装插件记录
                    _lowdb.lowdbAction.addPluginPkg(pkgList);

                    setInstallFlag('安装成功');
                    setStep(function (state) {
                      return _objectSpread(
                        _objectSpread({}, state),
                        {},
                        {
                          help: true,
                          spinnerFlag: false,
                        },
                      );
                    });

                    var pluginModule = require(pkgList.pkgName)['default']();

                    if (pluginModule.isStart) {
                      //生成自启动脚本
                      var osascriptContent = '\n            tell application "Terminal"\n              activate\n              do script "muniz '.concat(
                        pkgList.shortName,
                        '"\n            end tell\n          ',
                      );
                      execa.commandSync("osascript -e '".concat(osascriptContent, "'"), {
                        shell: true,
                      });
                    }

                    setTimeout(function () {
                      exit();
                    }, 200);
                  })
                  ['catch'](function () {
                    setInstallFlag('安装失败，请检查 npm 镜像，是否存在本次安装的插件包！');
                    setStep(function (state) {
                      return _objectSpread(
                        _objectSpread({}, state),
                        {},
                        {
                          spinnerFlag: false,
                        },
                      );
                    });
                    setTimeout(function () {
                      exit();
                    }, 200);
                  });

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee);
      }),
    );

    return function handleInstallPkg() {
      return _ref.apply(this, arguments);
    };
  })();

  return /*#__PURE__*/ _react['default'].createElement(
    _ink.Box,
    {
      flexDirection: 'column',
    },
    /*#__PURE__*/ _react['default'].createElement(
      _ink.Box,
      {
        marginBottom: '1',
      },
      /*#__PURE__*/ _react['default'].createElement(_ink.Text, null, '\u540D\u79F0\u683C\u5F0F\uFF1A'),
      /*#__PURE__*/ _react['default'].createElement(
        _ink.Text,
        {
          dimColor: true,
        },
        '[ @muniz/muniz-plugin-xxx ] - [ xxx/muniz-plugin-xxx ] - [ muniz-plugin-xxx ]',
      ),
    ),
    /*#__PURE__*/ _react['default'].createElement(_inkUi.TextInput, {
      label: '\u63D2\u4EF6\u540D\u79F0\uFF1A',
      placeHolder:
        '\u8BF7\u8F93\u5165\u63D2\u4EF6\u540D\u79F0\uFF08\u6BCF\u6B21\u53EA\u80FD\u5B89\u88C5\u4E00\u4E2A\u63D2\u4EF6\uFF09',
      onChange: handleOnChnagePkg,
      value: input.length > 0 ? input[0] : '',
      error: error,
    }),
    !step.install &&
      /*#__PURE__*/ _react['default'].createElement(
        _inkUi.ButtonGroup,
        {
          marginTop: '1',
        },
        /*#__PURE__*/ _react['default'].createElement(
          _inkUi.Button,
          {
            marginRight: '3',
            disabled: error !== '',
            interval: '2',
            onBlur: handleInstallPkg,
          },
          '\u786E\u8BA4',
        ),
        /*#__PURE__*/ _react['default'].createElement(
          _inkUi.Button,
          {
            interval: 2,
            marginRight: '3',
            onBlur: function onBlur() {
              exit();
            },
          },
          '\u53D6\u6D88',
        ),
      ),
    step.spinnerFlag &&
      /*#__PURE__*/ _react['default'].createElement(
        _ink.Box,
        {
          marginTop: '1',
        },
        /*#__PURE__*/ _react['default'].createElement(
          _inkUi.Spinner,
          {
            color: 'green',
          },
          /*#__PURE__*/ _react['default'].createElement(
            _ink.Text,
            null,
            '\u6B63\u5728\u5B89\u88C5\u4E2D\uFF0C\u7B49\u5F85...',
          ),
        ),
      ),
    /*#__PURE__*/ _react['default'].createElement(
      _ink.Box,
      {
        marginTop: '1',
      },
      /*#__PURE__*/ _react['default'].createElement(
        _ink.Text,
        {
          color: 'green',
        },
        installFlag,
      ),
    ),
    step.help &&
      /*#__PURE__*/ _react['default'].createElement(
        _ink.Box,
        {
          marginTop: '1',
        },
        /*#__PURE__*/ _react['default'].createElement(_ink.Text, null, '\u4F7F\u7528\u547D\u4EE4:'),
        /*#__PURE__*/ _react['default'].createElement(
          _ink.Text,
          {
            color: 'blue',
          },
          ' $ muniz create',
        ),
      ),
  );
};

Add.propTypes = {
  /**
   * @muniz
   * @description falgs哈哈
   */
  mode: _propTypes['default'].string,

  /**
   * @muniz
   * @description 生成项目的名称
   * @alias n
   */
  isGit: _propTypes['default'].bool,
};
Add.defaultProps = {
  mode: 'dev',
  isGit: false,
};
var _default = Add;
exports['default'] = _default;
