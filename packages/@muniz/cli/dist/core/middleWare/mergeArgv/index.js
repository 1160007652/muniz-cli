"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/**
 * 合并 argv 中的 options 对象数据, 实现如下几点：
 * - 将（alias）别名转化为全量的名称；
 * - 转化options类型(type)；
 * - 赋值默认值， 将给定的参数进行默认值赋值；
 */
var mergeArgv = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx, next) {
    var argv, astCommands, env, newOptions, _astCommands, _astCommands$2, _astCommands$2$option;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            argv = ctx.argv, astCommands = ctx.astCommands, env = ctx.env;
            newOptions = {};
            _astCommands = [];

            if (env.command === 'cli') {
              _astCommands = astCommands.filter(function (item) {
                return item.key === argv.command[0];
              });
            } else {
              _astCommands = astCommands.filter(function (item) {
                return item.key === argv.command[1];
              });
            }

            if (Object.keys(argv.options).length > 0) {
              Object.keys(argv.options).forEach(function (item) {
                var _astCommands$, _astCommands$$options;

                var aliasName = item; // 合并 --help, -h 参数

                if (['h', 'help'].includes(item)) {
                  newOptions['help'] = true;
                  aliasName = 'help';
                } // 合并 --version, -v 参数


                if (['v', 'version'].includes(item)) {
                  newOptions['version'] = true;
                  aliasName = 'version';
                } // 整合 短名称参数，如果有该参数，未设值 那么 取预设的默认值


                (_astCommands$ = _astCommands[0]) === null || _astCommands$ === void 0 ? void 0 : (_astCommands$$options = _astCommands$.options) === null || _astCommands$$options === void 0 ? void 0 : _astCommands$$options.forEach(function (_options) {
                  if ([_options.alias, _options.key].includes(item)) {
                    newOptions[_options.key] = argv.options[item] || _options["default"];
                    aliasName = _options.key;
                  }
                }); // 不复制 没有被用户添加的选项参数-数据

                if (!['function', 'undefined'].includes((0, _typeof2["default"])(argv.options[item]))) {
                  if (!(aliasName in newOptions)) {
                    newOptions[item] = argv.options[item];
                  }
                }
              });
            } else {
              // 如果没有参数, 那么全部取预设的数据
              (_astCommands$2 = _astCommands[0]) === null || _astCommands$2 === void 0 ? void 0 : (_astCommands$2$option = _astCommands$2.options) === null || _astCommands$2$option === void 0 ? void 0 : _astCommands$2$option.forEach(function (_options) {
                if (_options === null || _options === void 0 ? void 0 : _options.key) {
                  newOptions[_options.key] = _options["default"];
                }
              });
            }

            argv.options = newOptions;
            next();

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function mergeArgv(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = mergeArgv;
exports["default"] = _default;