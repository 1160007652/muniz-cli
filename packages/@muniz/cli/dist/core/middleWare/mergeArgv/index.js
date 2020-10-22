"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _servers = require("@muniz/servers");

/**
 * 合并 argv 中的 options 对象数据, 实现如下几点：
 * - 将（alias）别名转化为全量的名称；
 * - 转化options类型(type)；
 * - 赋值默认值， 将给定的参数进行默认值赋值；
 *
 */
var mergeArgv = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx, next) {
    var pkgName, argv, env, pkgPath, newOptions, _ctx$currentModule, cliConfig, i18nLocales, result, _result2, _result2$options;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pkgName = ctx.pkgName, argv = ctx.argv, env = ctx.env, pkgPath = ctx.pkgPath;
            newOptions = {};

            if (env.command === 'plugin') {
              ctx.currentModule = require(pkgName)["default"];
            }

            _ctx$currentModule = ctx.currentModule, cliConfig = _ctx$currentModule.cliConfig, i18nLocales = _ctx$currentModule.i18nLocales;
            _context.next = 6;
            return (0, _servers.generateCommand)("".concat(pkgPath, "/src/command"), "".concat(pkgPath, "/src/command"));

          case 6:
            result = _context.sent;

            // console.log(ctx);
            if (argv.input.length === 0) {// next();
            } else if (argv.input.length === 1) {
              result = result.filter(function (item) {
                return item.key === argv.input[0];
              })[0];
            } else {
              result = result.filter(function (item) {
                return item.key === argv.input[1];
              })[0];
            }

            if (Object.keys(argv.options).length > 0) {
              Object.keys(argv.options).forEach(function (item) {
                var _result, _result$options;

                // 合并 --help, -h 参数
                if (['h', 'help'].includes(item)) {
                  newOptions['help'] = true;
                } // 合并 --version, -v 参数


                if (['v', 'version'].includes(item)) {
                  newOptions['version'] = true;
                }

                var aliasName = item; // 整合 短名称参数，如果有该参数，未设值 那么 取预设的默认值

                (_result = result) === null || _result === void 0 ? void 0 : (_result$options = _result.options) === null || _result$options === void 0 ? void 0 : _result$options.forEach(function (_options) {
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
              (_result2 = result) === null || _result2 === void 0 ? void 0 : (_result2$options = _result2.options) === null || _result2$options === void 0 ? void 0 : _result2$options.forEach(function (_options) {
                if (_options === null || _options === void 0 ? void 0 : _options.key) {
                  newOptions[_options.key] = _options["default"];
                }
              });
            }

            argv.options = newOptions;
            next();

          case 11:
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