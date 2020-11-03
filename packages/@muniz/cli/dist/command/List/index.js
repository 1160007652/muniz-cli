'use strict';

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard');

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _slicedToArray2 = _interopRequireDefault(require('@babel/runtime/helpers/slicedToArray'));

var _react = _interopRequireWildcard(require('react'));

var _ink = require('ink');

var _inkUi = require('@muniz/ink-ui');

var _lowdb = require('../../lib/lowdb.js');

/**
 * @muniz
 * @type react
 * @description 插件列表
 */
var List = function List(props) {
  var _useState = (0, _react.useState)([['序号', '命令', '插件名称']]),
    _useState2 = (0, _slicedToArray2['default'])(_useState, 2),
    pkgList = _useState2[0],
    setPkgList = _useState2[1];

  (0, _react.useEffect)(function () {
    var result = _lowdb.lowdbAction.getPluginPkgList();

    setPkgList(function (state) {
      return state.concat(result);
    });
  }, []);
  return /*#__PURE__*/ _react['default'].createElement(
    _ink.Box,
    {
      flexDirection: 'column',
      marginTop: '1',
    },
    /*#__PURE__*/ _react['default'].createElement(
      _ink.Box,
      {
        marginBottom: '1',
      },
      /*#__PURE__*/ _react['default'].createElement(
        _ink.Text,
        null,
        'Muniz \u811A\u624B\u67B6\uFF0C\u5DF2\u5B89\u88C5',
        /*#__PURE__*/ _react['default'].createElement(
          _ink.Text,
          {
            color: 'green',
          },
          ' ',
          pkgList.length - 1,
          ' ',
        ),
        '\u4E2A\u63D2\u4EF6',
      ),
    ),
    /*#__PURE__*/ _react['default'].createElement(
      _ink.Box,
      {
        flexDirection: 'column',
      },
      pkgList.length > 1
        ? /*#__PURE__*/ _react['default'].createElement(_inkUi.Table, {
            data: pkgList,
          })
        : /*#__PURE__*/ _react['default'].createElement(
            _ink.Text,
            null,
            '\u8FD8\u672A\u5B89\u88C5\u63D2\u4EF6\u6269\u5C55\uFF0C\u8BF7\u6267\u884C muniz add \u547D\u4EE4\uFF0C\u6DFB\u52A0\u9700\u8981\u7684\u63D2\u4EF6',
          ),
    ),
  );
};

var _default = List;
exports['default'] = _default;
