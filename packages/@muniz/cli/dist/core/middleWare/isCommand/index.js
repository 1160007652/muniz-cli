'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _react = _interopRequireDefault(require('react'));

var _ink = require('ink');

/**
 * 是否是内置命令
 */
var isCommand = function isCommand(ctx, next) {
  var commands = ctx.commands,
    argv = ctx.argv,
    render = ctx.render; // 如果 argv.input > 0, 表示输入了执行命令， 开始执行输入的命令

  if (argv.input.length > 0) {
    // 如果输入的命令是 内置命令， 那么执行内置框架命令
    if (commands.includes(argv.input[0])) {
      ctx.pkgName = '@muniz/cli';
      ctx.pkgPath = __filename.replace(new RegExp('(@muniz/cli)/.*$', 'ig'), function (_, c) {
        return c;
      });
      ctx.pkg = require(''.concat(ctx.pkgPath, '/package.json'));
    } else {
      try {
        ctx.pkgName = '@muniz/muniz-plugin-'.concat(argv.input[0]);

        var _tempPkgPath = require.resolve(ctx.pkgName);

        ctx.pkgPath = _tempPkgPath.replace(new RegExp('('.concat(ctx.pkgName, ')/.*$'), 'ig'), function (_, c) {
          return c;
        });
        ctx.pkg = require(''.concat(ctx.pkgPath, '/package.json'));
      } catch (_unused) {
        render(
          /*#__PURE__*/ _react['default'].createElement(
            _ink.Text,
            null,
            '\u6253\u5370 \u6267\u884C\u547D\u4EE4\u4E0D\u5B58\u5728',
          ),
        );
        /**
         * 可以在这里做 命令 推荐
         */

        process.exit();
      }
    }

    next();
  } else {
    // 如果 argv.input === 0, 没有输入执行命令， 这种情况 打印“帮助”命令
    render(
      /*#__PURE__*/ _react['default'].createElement(
        _ink.Text,
        null,
        '\u6253\u5370\u4E3B\u6846\u67B6\u5E2E\u52A9\u547D\u4EE4',
      ),
    );
    process.exit();
  }
};

var _default = isCommand;
exports['default'] = _default;
