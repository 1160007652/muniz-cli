"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lowdb = require("../../lib/lowdb.js");

var execa = require('execa');

var ora = require('ora');
/**
 * @muniz
 * @type function
 * @description help_remove_desc
 */


var Remove = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref) {
    var input, spinner, pkgName;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            input = _ref.input;

            if (!input.join('').trim()) {
              console.log('请输入要删除的插件');
              process.exit();
            }

            spinner = ora();
            _context2.next = 5;
            return _lowdb.lowdbAction.getPluginPkgName({
              shortName: input.join('').trim()
            });

          case 5:
            pkgName = _context2.sent;
            spinner.start('正在删除中，请稍等片刻');

            if (!pkgName) {
              _context2.next = 12;
              break;
            }

            _context2.next = 10;
            return execa.command("npm uninstall -g ".concat(pkgName)).then( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return _lowdb.lowdbAction.removePluginPkg({
                        pkgName: pkgName
                      });

                    case 2:
                      spinner.fail('删除成功');

                    case 3:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            })))["catch"](function () {
              spinner.fail('删除失败，请执行 muniz list 命令，查看是否存在该插件！');
            });

          case 10:
            _context2.next = 13;
            break;

          case 12:
            spinner.fail('删除失败，请执行 muniz list 命令，查看是否存在该插件！');

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function Remove(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = Remove;
exports["default"] = _default;