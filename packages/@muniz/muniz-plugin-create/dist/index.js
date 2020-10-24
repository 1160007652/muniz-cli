"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Life = /*#__PURE__*/function () {
  function Life() {
    (0, _classCallCheck2["default"])(this, Life);
    // 安装成功后是否立即执行
    this.isStart = true;
    this.locales = ['zh', 'cn']; // 插件支持的国际化语言

    this.defaultCommand = 'create'; // 插件默认执行命令, 以 muniz 插件名 运行时，执行那条命令，无配置 为 cli 打印 help 命令
  }

  (0, _createClass2["default"])(Life, [{
    key: "footer",
    value: function footer() {
      return '我是帮助文档底部描述信息';
    }
  }, {
    key: "header",
    value: function header() {
      return '我是帮助文档顶部描述信息';
    }
  }]);
  return Life;
}();

var _default = function _default(props) {
  return new Life();
};

exports["default"] = _default;