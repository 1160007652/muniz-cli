"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _common = require("@muniz/common");

var _servers = require("@muniz/servers");

var path = require('path');

var fs = require('fs-extra');

var NotCommand = _common.InkUI.NotCommand;

var MunizConfig = require(path.resolve(__filename, '../../../../configs/system.json'));
/**
 * 是否是内置命令
 */


var isCommand = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx, next) {
    var argv, render, isCliCommand, _tempPkgPath, pluginConfig, _argv$options, _argv$options2, _argv$options3;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            argv = ctx.argv, render = ctx.render; // 初始化执行内置框架命令

            ctx.pkgName = '@muniz/cli';
            ctx.pkgPath = __filename.replace(new RegExp('@muniz(.*?)$', 'ig'), function (_, c) {
              return path.join(ctx.pkgName);
            });
            ctx.pkg = require(path.join(ctx.pkgPath, '/package.json')); // 读取命令AST信息

            if (!MunizConfig.MUNIZ_CLI_DEBUG) {
              _context.next = 10;
              break;
            }

            _context.next = 7;
            return (0, _servers.generateCommand)(path.join(ctx.pkgPath, '/src/command'), path.join(ctx.pkgPath, '/src/command'));

          case 7:
            ctx.astCommands = _context.sent;
            _context.next = 11;
            break;

          case 10:
            ctx.astCommands = fs.readJsonSync(path.join(ctx.pkgPath, '/dist/configs/commandHelp.json'));

          case 11:
            if (!(argv.command.length > 0)) {
              _context.next = 45;
              break;
            }

            // 设置当前的开发环境, 是什么模式 由 用户的 命令行输入决定
            if ('mode' in argv.options) {
              delete argv.options.mode;
            } // 检查是否是内置的CLI 命令


            isCliCommand = ctx.astCommands.some(function (item) {
              return item.key === argv.command[0];
            }); // 执行 非内置命令 =》 插件命令

            if (isCliCommand) {
              _context.next = 41;
              break;
            }

            ctx.env.command = 'plugin'; // 当前 运行环境 变更为 插件， 默认是 cli 主控制器环境

            _context.prev = 16;
            ctx.pkgName = "@muniz/muniz-plugin-".concat(argv.command[0]);
            _tempPkgPath = require.resolve(ctx.pkgName);
            ctx.pkgPath = _tempPkgPath.replace(new RegExp('@muniz(.*?)$', 'ig'), function (_, c) {
              return path.join(ctx.pkgName);
            });
            ctx.pkg = require(path.join(ctx.pkgPath, '/package.json')); // 读取命令AST信息

            if (!MunizConfig.MUNIZ_CLI_DEBUG) {
              _context.next = 27;
              break;
            }

            _context.next = 24;
            return (0, _servers.generateCommand)(path.join(ctx.pkgPath, '/src/command'), path.join(ctx.pkgPath, '/src/command'));

          case 24:
            ctx.astCommands = _context.sent;
            _context.next = 28;
            break;

          case 27:
            ctx.astCommands = fs.readJsonSync(path.join(ctx.pkgPath, '/dist/configs/commandHelp.json'));

          case 28:
            // 读取插件配置信息
            pluginConfig = require(path.join(ctx.pkgPath, '/dist/index.js'))["default"](1);

            if (argv.command.length < 2) {
              if ((pluginConfig === null || pluginConfig === void 0 ? void 0 : pluginConfig.defaultCommand) && !['', 'function', 'undefined'].includes(pluginConfig === null || pluginConfig === void 0 ? void 0 : pluginConfig.defaultCommand)) {// argv.command.push(pluginConfig.defaultCommand);
              } else {
                argv.options['help'] = true;
              }
            }

            _context.next = 39;
            break;

          case 32:
            _context.prev = 32;
            _context.t0 = _context["catch"](16);
            ctx.pkgName = "@muniz/muniz-plugin-".concat(argv.command[0]);
            ctx.pkgPath = '';
            ctx.pkg = {};
            render( /*#__PURE__*/_common.React.createElement(NotCommand, ctx));
            process.exit();

          case 39:
            _context.next = 42;
            break;

          case 41:
            if (argv.command.length > 1) {
              argv.input.unshift(argv.command.pop());
            }

          case 42:
            next();
            _context.next = 47;
            break;

          case 45:
            /**
             *
             * 如果 argv.input === 0, 且 argv.options === 0 时, 置入 argv.options.help = true , 走 打印中间件 显示“帮助”命令
             *
             * 如果是 --version，-V 参数，放行 next()
             *
             */
            if (Object.keys(argv.options).length >= 0 && !(((_argv$options = argv.options) === null || _argv$options === void 0 ? void 0 : _argv$options.version) || ((_argv$options2 = argv.options) === null || _argv$options2 === void 0 ? void 0 : _argv$options2.v) || ((_argv$options3 = argv.options) === null || _argv$options3 === void 0 ? void 0 : _argv$options3.mode))) {
              argv.options['help'] = true;
            }

            next();

          case 47:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[16, 32]]);
  }));

  return function isCommand(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = isCommand;
exports["default"] = _default;