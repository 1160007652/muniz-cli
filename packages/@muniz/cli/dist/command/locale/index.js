"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lowdb = require("../../lib/lowdb.js");

var _i18n = _interopRequireDefault(require("../../lib/i18n"));

var inquirer = require('inquirer');

/**
 * @muniz
 * @type function
 * @description help_locale_desc
 */
var Locale = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(props) {
    var promptList, answers;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // 非react 交互
            promptList = [{
              type: 'list',
              message: _i18n["default"].getLocale('command_locale_tips', {
                count: 2
              }),
              name: 'language',
              "default": _i18n["default"].currentLocale,
              choices: [{
                value: 'zhCN',
                name: _i18n["default"].getLocale('zh_cn')
              }, {
                value: 'enUS',
                name: _i18n["default"].getLocale('en_us')
              }]
            }];
            _context.next = 3;
            return inquirer.prompt(promptList);

          case 3:
            answers = _context.sent;

            _lowdb.lowdbAction.setLanguageLocale({
              language: answers.language
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function Locale(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = Locale;
exports["default"] = _default;