"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _command = require("../../../command");

/**
 * 是否是内置命令
 */
var isCommand = function isCommand(ctx, next) {
  var commands = ctx.commands,
      argv = ctx.argv,
      render = ctx.render; // 初始化执行内置框架命令

  ctx.pkgName = '@muniz/cli';
  ctx.pkgPath = __filename.replace(new RegExp('(@muniz/cli)/.*$', 'ig'), function (_, c) {
    return c;
  });
  ctx.pkg = require("".concat(ctx.pkgPath, "/package.json")); // 如果 argv.input > 0, 表示输入了执行命令， 开始执行输入的命令

  if (argv.input.length > 0) {
    // 执行 非内置命令 =》 插件命令
    if (!commands.includes(argv.input[0])) {
      ctx.env.command = 'plugin'; // 当前 运行环境 变更为 插件， 默认是 cli 主控制器环境

      try {
        ctx.pkgName = "@muniz/muniz-plugin-".concat(argv.input[0]);

        var _tempPkgPath = require.resolve(ctx.pkgName);

        ctx.pkgPath = _tempPkgPath.replace(new RegExp("(".concat(ctx.pkgName, ")/.*$"), 'ig'), function (_, c) {
          return c;
        });
        ctx.pkg = require("".concat(ctx.pkgPath, "/package.json"));
      } catch (_unused) {
        ctx.pkgName = "@muniz/muniz-plugin-".concat(argv.input[0]);
        ctx.pkgPath = '';
        ctx.pkg = {};
        render( /*#__PURE__*/_react["default"].createElement(_command.UI_NotCommand, ctx));
        process.exit();
      }
    }

    next();
  } else {
    var _argv$options, _argv$options2;

    /**
     *
     * 如果 argv.input === 0, 且 argv.options === 0 时, 置入 argv.options.help = true , 走 打印中间件 显示“帮助”命令
     *
     * 如果是 --version，-V 参数，放行 next()
     *
     */
    if (Object.keys(argv.options).length >= 0 && !(((_argv$options = argv.options) === null || _argv$options === void 0 ? void 0 : _argv$options.version) || ((_argv$options2 = argv.options) === null || _argv$options2 === void 0 ? void 0 : _argv$options2.v))) {
      argv.options['help'] = true;
    }

    next();
  }
};

var _default = isCommand;
exports["default"] = _default;