'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.pluginCommand = exports['default'] = void 0;

var _classCallCheck2 = _interopRequireDefault(require('@babel/runtime/helpers/classCallCheck'));

var _createClass2 = _interopRequireDefault(require('@babel/runtime/helpers/createClass'));

var _ink = require('ink');

var _react = _interopRequireDefault(require('react'));

var Life = /*#__PURE__*/ (function () {
  function Life() {
    (0, _classCallCheck2['default'])(this, Life);
    // 安装成功后是否立即执行
    this.isStart = true;
    this.locales = ['zh', 'cn']; // 插件支持的国际化语言

    this.defaultCommand = 'create'; // 插件默认执行命令, 以 muniz 插件名 运行时，执行那条命令，无配置 为 cli 打印 help 命令
  }

  (0, _createClass2['default'])(Life, [
    {
      key: 'footer',
      value: function footer() {
        return '我是帮助文档底部描述信息';
      },
    },
    {
      key: 'header',
      value: function header() {
        return '我是帮助文档顶部描述信息';
      },
    },
  ]);
  return Life;
})();

var _default = function _default(props) {
  return new Life();
};
/**
 * muniz 脚手架（宿主环境）通过此通道执行插件命令
 * @param {object} param
 * @param {string} param.commandPath 执行命令路径
 * @param {object} param.data 插件命令数据
 */

exports['default'] = _default;

var pluginCommand = function pluginCommand(_ref) {
  var commandPath = _ref.commandPath,
    data = _ref.data;

  var _command = require('./command/'.concat(commandPath))['default'];

  (0, _ink.render)(/*#__PURE__*/ _react['default'].createElement(_command, data));
};

exports.pluginCommand = pluginCommand;
