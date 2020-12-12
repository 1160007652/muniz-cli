"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _prompts = _interopRequireDefault(require("./lib/prompts"));

/**
 * @muniz
 * @type function
 * @description 创建指令
 * */
var Create = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(props) {
    var originPath, answers;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            originPath = '/Users/mac/NodeProjects/muniz-tpl/muniz-tpl-pc'; // 源工程模版

            console.log(props); // 获取前置预设

            _context.next = 4;
            return (0, _prompts["default"])();

          case 4:
            answers = _context.sent;
            console.log(answers);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function Create(_x) {
    return _ref.apply(this, arguments);
  };
}();

Create.propTypes = {
  /**
   * @muniz
   * @description falgs哈哈
   */
  flags: _propTypes["default"].string,

  /**
   * @muniz
   * @description Number类型转换
   */
  count: _propTypes["default"].number,

  /**
   * @muniz
   * @description 生成项目的名称
   * @alias n
   */
  isGit: _propTypes["default"].bool
};
Create.defaultProps = {
  flags: 'wowowoowqqqqqqq',
  isGit: false,
  count: 1
};
var _default = Create;
exports["default"] = _default;