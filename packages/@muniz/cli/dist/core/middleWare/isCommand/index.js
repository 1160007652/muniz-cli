'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'));

var _asyncToGenerator2 = _interopRequireDefault(require('@babel/runtime/helpers/asyncToGenerator'));

var _react = _interopRequireDefault(require('react'));

var _inkUi = require('@muniz/ink-ui');

var _servers = require('@muniz/servers');

/**
 * 是否是内置命令
 */
var isCommand = /*#__PURE__*/ (function () {
  var _ref = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee(ctx, next) {
      var argv, render, isCliCommand, _tempPkgPath, pluginConfig, _argv$options, _argv$options2;

      return _regenerator['default'].wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                (argv = ctx.argv), (render = ctx.render); // 初始化执行内置框架命令

                ctx.pkgName = '@muniz/cli';
                ctx.pkgPath = __filename.replace(new RegExp('(@muniz/cli)/.*$', 'ig'), function (_, c) {
                  return c;
                });
                ctx.pkg = require(''.concat(ctx.pkgPath, '/package.json')); // 读取命令AST信息

                _context.next = 6;
                return (0, _servers.generateCommand)(
                  ''.concat(ctx.pkgPath, '/src/command'),
                  ''.concat(ctx.pkgPath, '/src/command'),
                );

              case 6:
                ctx.astCommands = _context.sent;

                if (!(argv.command.length > 0)) {
                  _context.next = 33;
                  break;
                }

                // 检查是否是内置的CLI 命令
                isCliCommand = ctx.astCommands.some(function (item) {
                  return item.key === argv.command[0];
                }); // 执行 非内置命令 =》 插件命令

                if (isCliCommand) {
                  _context.next = 30;
                  break;
                }

                ctx.env.command = 'plugin'; // 当前 运行环境 变更为 插件， 默认是 cli 主控制器环境

                _context.prev = 11;
                ctx.pkgName = '@muniz/muniz-plugin-'.concat(argv.command[0]);
                _tempPkgPath = require.resolve(ctx.pkgName);
                ctx.pkgPath = _tempPkgPath.replace(new RegExp('('.concat(ctx.pkgName, ')/.*$'), 'ig'), function (_, c) {
                  return c;
                });
                ctx.pkg = require(''.concat(ctx.pkgPath, '/package.json')); // 读取命令AST信息

                _context.next = 18;
                return (0, _servers.generateCommand)(
                  ''.concat(ctx.pkgPath, '/src/command'),
                  ''.concat(ctx.pkgPath, '/src/command'),
                );

              case 18:
                ctx.astCommands = _context.sent;
                // 读取插件配置信息
                pluginConfig = require(''.concat(ctx.pkgPath, '/dist/index.js'))['default'](1);

                if (argv.command.length < 2) {
                  if (
                    (pluginConfig === null || pluginConfig === void 0 ? void 0 : pluginConfig.defaultCommand) &&
                    !['', 'function', 'undefined'].includes(
                      pluginConfig === null || pluginConfig === void 0 ? void 0 : pluginConfig.defaultCommand,
                    )
                  ) {
                    // argv.command.push(pluginConfig.defaultCommand);
                  } else {
                    argv.options['help'] = true;
                  }
                }

                _context.next = 30;
                break;

              case 23:
                _context.prev = 23;
                _context.t0 = _context['catch'](11);
                ctx.pkgName = '@muniz/muniz-plugin-'.concat(argv.command[0]);
                ctx.pkgPath = '';
                ctx.pkg = {};
                render(/*#__PURE__*/ _react['default'].createElement(_inkUi.NotCommand, ctx));
                process.exit();

              case 30:
                next();
                _context.next = 35;
                break;

              case 33:
                /**
                 *
                 * 如果 argv.input === 0, 且 argv.options === 0 时, 置入 argv.options.help = true , 走 打印中间件 显示“帮助”命令
                 *
                 * 如果是 --version，-V 参数，放行 next()
                 *
                 */
                if (
                  Object.keys(argv.options).length >= 0 &&
                  !(
                    ((_argv$options = argv.options) === null || _argv$options === void 0
                      ? void 0
                      : _argv$options.version) ||
                    ((_argv$options2 = argv.options) === null || _argv$options2 === void 0 ? void 0 : _argv$options2.v)
                  )
                ) {
                  argv.options['help'] = true;
                }

                next();

              case 35:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        null,
        [[11, 23]],
      );
    }),
  );

  return function isCommand(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

var _default = isCommand;
exports['default'] = _default;
