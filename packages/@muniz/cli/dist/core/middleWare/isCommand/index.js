"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _react = _interopRequireDefault(require("react"));

var _inkUi = require("@muniz/ink-ui");

var _servers = require("@muniz/servers");

var _lowdb = require("../../../lib/lowdb.js");

var path = require('path');

var fs = require('fs-extra');

var MunizConfig = require('../../../configs/system.json');

/**
 * 是否是内置命令
 */
var isCommand = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ctx, next) {
    var argv, render, isCliCommand, pluginPkgName, _tempPkgPath, pluginConfig, _argv$options, _argv$options2, _argv$options3;

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
            ctx.astCommands = fs.readJsonSync(path.join(ctx.pkgPath, '/dist/configs/commandHelp.json'))[MunizConfig.languageLocale];

          case 11:
            if (!(argv.command.length > 0)) {
              _context.next = 43;
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
              _context.next = 39;
              break;
            }

            ctx.env.command = 'plugin'; // 当前 运行环境 变更为 插件， 默认是 cli 主控制器环境

            /**
             * 这一块的插件名称，要根据 一定的规则去执行
             *
             * 在创建插件时，和安装插件时，要与 脚手架提供的插件 短命令 指令名称 进行比较，不允许使用 脚手架保留昵称；
             *
             * 使用插件时，需要进行 数据库查询，查找已安装的插件， 根据唯一的短指令昵称去匹配 全量包名；
             *
             */
            // 如果是 插件开发状态，返回 空字符串， 否则 进行插件库 判断

            if (!MunizConfig.MUNIZ_PLUGIN_DEV) {
              _context.next = 20;
              break;
            }

            _context.t0 = '';
            _context.next = 23;
            break;

          case 20:
            _context.next = 22;
            return _lowdb.lowdbAction.getPluginPkgName({
              shortName: argv.command[0]
            });

          case 22:
            _context.t0 = _context.sent;

          case 23:
            pluginPkgName = _context.t0;

            /**
             * 没有安装对应的插件, 结束执行
             * 如果是在开发插件的状态，打开脚手架插件开发通道时，跳过此处检查
             */
            if (pluginPkgName === '' && !MunizConfig.MUNIZ_PLUGIN_DEV) {
              ctx.pkgPath = '';
              ctx.pkg = {};
              render( /*#__PURE__*/_react["default"].createElement(_inkUi.NotCommand, (0, _extends2["default"])({}, ctx, {
                locale: MunizConfig.languageLocale
              })));
              process.exit();
            }

            ctx.pkgName = pluginPkgName; // 当前执行插件是否是 走 开发状态 通道

            if (MunizConfig.MUNIZ_PLUGIN_DEV) {
              ctx.pkgPath = process.cwd();
            } else {
              try {
                _tempPkgPath = require.resolve(ctx.pkgName);
                ctx.pkgPath = _tempPkgPath.replace(new RegExp("".concat(path.join(ctx.pkgName), "(.*?)$"), 'ig'), function (_, c) {
                  return ctx.pkgName;
                });
              } catch (_unused) {
                ctx.pkgPath = '';
                ctx.pkg = {};
                render( /*#__PURE__*/_react["default"].createElement(_inkUi.NotCommand, (0, _extends2["default"])({}, ctx, {
                  locale: MunizConfig.languageLocale
                })));
                process.exit();
              }
            }

            ctx.pkg = require(path.join(ctx.pkgPath, '/package.json')); // 读取命令AST信息

            if (!MunizConfig.MUNIZ_CLI_DEBUG) {
              _context.next = 34;
              break;
            }

            _context.next = 31;
            return (0, _servers.generateCommand)(path.join(ctx.pkgPath, '/src/command'), path.join(ctx.pkgPath, '/src/command'));

          case 31:
            ctx.astCommands = _context.sent;
            _context.next = 35;
            break;

          case 34:
            ctx.astCommands = fs.readJsonSync(path.join(ctx.pkgPath, '/dist/configs/commandHelp.json'))[MunizConfig.languageLocale];

          case 35:
            // 读取插件配置信息
            pluginConfig = require(path.join(ctx.pkgPath, '/dist/index.js'))["default"]({
              locale: MunizConfig.languageLocale
            });

            if (argv.command.length < 2) {
              if ((pluginConfig === null || pluginConfig === void 0 ? void 0 : pluginConfig.defaultCommand) && !['', 'function', 'undefined'].includes(pluginConfig === null || pluginConfig === void 0 ? void 0 : pluginConfig.defaultCommand)) {// argv.command.push(pluginConfig.defaultCommand);
              } else {
                argv.options['help'] = true;
              }
            }

            _context.next = 40;
            break;

          case 39:
            if (argv.command.length > 1) {
              argv.input.unshift(argv.command.pop());
            }

          case 40:
            next();
            _context.next = 45;
            break;

          case 43:
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

          case 45:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function isCommand(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = isCommand;
exports["default"] = _default;