'use strict';

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard');

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require('@babel/runtime/helpers/toConsumableArray'));

var _slicedToArray2 = _interopRequireDefault(require('@babel/runtime/helpers/slicedToArray'));

var _react = _interopRequireWildcard(require('react'));

var _ink = require('ink');

var _propTypes = _interopRequireDefault(require('prop-types'));

var execa = require('execa');
/**
 * @muniz
 * @description 添加插件
 */

var Add = function Add(props) {
  var _useState = (0, _react.useState)([]),
    _useState2 = (0, _slicedToArray2['default'])(_useState, 2),
    pkgList = _useState2[0],
    setPkgList = _useState2[1];

  var _useState3 = (0, _react.useState)(''),
    _useState4 = (0, _slicedToArray2['default'])(_useState3, 2),
    error = _useState4[0],
    setError = _useState4[1];

  var input = props.input;
  (0, _react.useEffect)(function () {
    input.forEach(function (item) {
      var _shortName;

      // 提取短名称 @muniz/muniz-plugin-create => create
      var shortName = String(item).match(/.*?muniz-plugin-(.*?)$/);
      shortName =
        ((_shortName = shortName) === null || _shortName === void 0 ? void 0 : _shortName.length) > 1
          ? shortName[1]
          : '';

      if (!shortName) {
        setError(''.concat(item, ' : \u4E0D\u662F\u300C Muniz \u300D \u811A\u624B\u67B6\u63D2\u4EF6'));
      } else {
        setPkgList(function (state) {
          return [].concat((0, _toConsumableArray2['default'])(state), [
            {
              shortName: shortName,
              pkgName: item,
            },
          ]);
        });
      }
    });
  }, []); // execa.commandSync(`npm uninstall -g ${input.join(' ')} `);

  return /*#__PURE__*/ _react['default'].createElement(
    _ink.Box,
    null,
    /*#__PURE__*/ _react['default'].createElement(
      _ink.Box,
      null,
      input.length < 0 &&
        /*#__PURE__*/ _react['default'].createElement(
          _ink.Text,
          null,
          '\u8BF7\u8F93\u5165\u8981\u5B89\u88C5\u7684\u63D2\u4EF6\u5305\u540D\u79F0',
        ),
    ),
    error
      ? /*#__PURE__*/ _react['default'].createElement(_ink.Text, null, error)
      : /*#__PURE__*/ _react['default'].createElement(
          _ink.Box,
          {
            flexDirection: 'column',
          },
          /*#__PURE__*/ _react['default'].createElement(_ink.Text, null, '\u6B63\u5728\u5B89\u88C5\u5982\u4E0B\u5305'),
          pkgList.length > 0 &&
            pkgList.map(function (item, index) {
              return /*#__PURE__*/ _react['default'].createElement(
                _ink.Text,
                {
                  key: index,
                },
                item.pkgName,
              );
            }),
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
