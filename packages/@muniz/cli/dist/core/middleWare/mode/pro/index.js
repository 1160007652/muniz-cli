"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _servers = require("@muniz/servers");

var path = require('path');

var fs = require('fs-extra');

var pro = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var _argv$options;

    var argv, pkgPath, descPath, astCommands;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            argv = _ref.argv, pkgPath = _ref.pkgPath;
            console.log('主muniz控制器 生产者模式');

            if (!(((_argv$options = argv.options) === null || _argv$options === void 0 ? void 0 : _argv$options.type) === 'desc')) {
              _context.next = 9;
              break;
            }

            console.log('生成描述信息');
            descPath = path.join(pkgPath, '/src/command');
            _context.next = 7;
            return (0, _servers.generateCommand)(descPath, descPath);

          case 7:
            astCommands = _context.sent;
            fs.writeJSONSync(path.join(pkgPath, '/dist/configs/commandHelp.json'), astCommands);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function pro(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = pro;
exports["default"] = _default;