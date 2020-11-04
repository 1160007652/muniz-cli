'use strict';

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard');

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'));

var _asyncToGenerator2 = _interopRequireDefault(require('@babel/runtime/helpers/asyncToGenerator'));

var _defineProperty2 = _interopRequireDefault(require('@babel/runtime/helpers/defineProperty'));

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
 * @description help_remove_desc
 */

var Remove = function Remove(props) {
  var input = props.input;

  var _useState = (0, _react.useState)(),
    _useState2 = (0, _slicedToArray2['default'])(_useState, 2),
    pkgList = _useState2[0],
    setPkgList = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
    _useState4 = (0, _slicedToArray2['default'])(_useState3, 2),
    pkgName = _useState4[0],
    setPkgName = _useState4[1];

  var _useState5 = (0, _react.useState)('不能为空'),
    _useState6 = (0, _slicedToArray2['default'])(_useState5, 2),
    error = _useState6[0],
    setError = _useState6[1];

  var _useState7 = (0, _react.useState)(''),
    _useState8 = (0, _slicedToArray2['default'])(_useState7, 2),
    installFlag = _useState8[0],
    setInstallFlag = _useState8[1];

  var _useApp = (0, _ink.useApp)(),
    exit = _useApp.exit; // 执行步骤

  var _useState9 = (0, _react.useState)({
      install: false,
      help: false,
      spinnerFlag: false,
    }),
    _useState10 = (0, _slicedToArray2['default'])(_useState9, 2),
    step = _useState10[0],
    setStep = _useState10[1];

  function handleOnChnagePkg(data) {
    if (data.trim()) {
      setError('');
    } else {
      setError('不能为空');
    }
  }

  function handleOnBlurPkg(data) {
    if (data.trim()) {
      setPkgList(data.trim());
    }
  }
  /**
   * 删除插件方法
   * @param {string} _pkgName 插件名称
   */

  function removePlugin(_pkgName) {
    setStep(function (state) {
      return _objectSpread(
        _objectSpread({}, state),
        {},
        {
          spinnerFlag: true,
        },
      );
    });
    execa
      .command('npm uninstall -g '.concat(_pkgName))
      .then(
        /*#__PURE__*/ (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee() {
            return _regenerator['default'].wrap(function _callee$(_context) {
              while (1) {
                switch ((_context.prev = _context.next)) {
                  case 0:
                    _context.next = 2;
                    return _lowdb.lowdbAction.removePluginPkg({
                      pkgName: _pkgName,
                    });

                  case 2:
                    setInstallFlag('删除成功');
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

                  case 5:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee);
          }),
        ),
      )
      ['catch'](function () {
        setInstallFlag('删除失败，请执行 muniz list 是否存在该插件！');
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
  } // 开始删除插件

  var handleRemovePkg = /*#__PURE__*/ (function () {
    var _ref2 = (0, _asyncToGenerator2['default'])(
      /*#__PURE__*/ _regenerator['default'].mark(function _callee2() {
        var pkgNameList;
        return _regenerator['default'].wrap(function _callee2$(_context2) {
          while (1) {
            switch ((_context2.prev = _context2.next)) {
              case 0:
                setStep(function (state) {
                  return _objectSpread(
                    _objectSpread({}, state),
                    {},
                    {
                      install: true,
                    },
                  );
                });
                _context2.next = 3;
                return _lowdb.lowdbAction.getPluginPkgName({
                  shortName: pkgList,
                  isReact: true,
                });

              case 3:
                pkgNameList = _context2.sent;

                if (pkgNameList.length === 0) {
                  setInstallFlag('删除失败，插件不存在！');
                  setStep(function (state) {
                    return _objectSpread(
                      _objectSpread({}, state),
                      {},
                      {
                        install: true,
                        spinnerFlag: false,
                      },
                    );
                  });
                  setTimeout(function () {
                    exit();
                  }, 200);
                } else if (pkgNameList.length === 1) {
                  removePlugin(pkgNameList);
                } else {
                  setPkgName(pkgNameList);
                }

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2);
      }),
    );

    return function handleRemovePkg() {
      return _ref2.apply(this, arguments);
    };
  })();

  return /*#__PURE__*/ _react['default'].createElement(
    _ink.Box,
    {
      flexDirection: 'column',
      marginBottom: '1',
    },
    /*#__PURE__*/ _react['default'].createElement(_inkUi.TextInput, {
      label: '\u63D2\u4EF6\u540D\u79F0\uFF1A',
      placeHolder:
        '\u8BF7\u8F93\u5165\u63D2\u4EF6\u540D\u79F0\uFF08\u6BCF\u6B21\u53EA\u80FD\u5220\u9664\u4E00\u4E2A\u63D2\u4EF6\uFF09',
      onChange: handleOnChnagePkg,
      onBlur: handleOnBlurPkg,
      disabled: step.install,
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
            onBlur: handleRemovePkg,
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
    pkgName.length > 0 &&
      /*#__PURE__*/ _react['default'].createElement(
        _ink.Box,
        {
          marginTop: '1',
          flexDirection: 'column',
        },
        /*#__PURE__*/ _react['default'].createElement(
          _ink.Text,
          null,
          '\u5B58\u5728\u591A\u4E2A\u63D2\u4EF6\uFF0C\u8BF7\u6307\u5B9A\u5F85\u5220\u9664\u7684\u63D2\u4EF6',
        ),
        /*#__PURE__*/ _react['default'].createElement(
          _ink.Box,
          {
            flexDirection: 'column',
            marginTop: '1',
          },
          pkgName.map(function (item, index) {
            return /*#__PURE__*/ _react['default'].createElement(
              _inkUi.Select,
              {
                key: index,
                onBlur: function onBlur() {
                  removePlugin(item.pkgName);
                },
              },
              /*#__PURE__*/ _react['default'].createElement(_ink.Text, null, item.pkgName),
            );
          }),
        ),
        /*#__PURE__*/ _react['default'].createElement(
          _ink.Text,
          {
            color: 'yellow',
          },
          '\u64CD\u4F5C\uFF1A\u6309\u4E0B tab \u952E \u5207\u6362\uFF0CEnter \u952E \u6267\u884C',
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
            '\u6B63\u5728\u5220\u9664\u4E2D\uFF0C\u7B49\u5F85...',
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
  );
};

Remove.propTypes = {
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
Remove.defaultProps = {
  mode: 'dev',
  isGit: false,
};
var _default = Remove;
exports['default'] = _default;
