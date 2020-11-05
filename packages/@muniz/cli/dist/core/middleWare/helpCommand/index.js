"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _inkUi = require("@muniz/ink-ui");

var _cliI18n = _interopRequireDefault(require("@muniz/cli-i18n"));

var _locales = _interopRequireDefault(require("../../../configs/locales"));

/**
 * 使用帮助命令
 */
var helpCommand = function helpCommand(ctx, next) {
  var _argv$options;

  var argv = ctx.argv,
      render = ctx.render,
      astCommands = ctx.astCommands;

  _cliI18n["default"].setlanguages({
    languages: _locales["default"]
  });

  if ((_argv$options = argv.options) === null || _argv$options === void 0 ? void 0 : _argv$options.help) {
    // 组合帮助文档数据
    var helpData = {
      otherOptions: [{
        key: 'help',
        alias: 'h',
        description: _cliI18n["default"].getLocale('command_options_help_tips')
      }, {
        key: 'version',
        alias: 'v',
        description: _cliI18n["default"].getLocale('command_options_version_tips')
      }],
      commands: astCommands,
      usage: {
        key: '$ muniz <command> [options]',
        description: ''
      }
    };

    switch (argv.command.length) {
      case 0:
        {
          render( /*#__PURE__*/_react["default"].createElement(_inkUi.Help, {
            data: helpData,
            show: "command",
            usage: "",
            locale: _cliI18n["default"].locale
          }));
          break;
        }

      case 1:
        {
          if (ctx.env.command === 'cli') {
            helpData.commands = astCommands.filter(function (item) {
              return item.key === argv.command[0];
            })[0];
            helpData.usage = {
              key: "$ muniz ".concat(argv.command[0], " [options]"),
              description: ''
            };
            render( /*#__PURE__*/_react["default"].createElement(_inkUi.Help, {
              data: helpData,
              show: "options",
              locale: _cliI18n["default"].locale
            }));
          } else {
            render( /*#__PURE__*/_react["default"].createElement(_inkUi.Help, {
              data: helpData,
              show: "command",
              usage: "",
              locale: _cliI18n["default"].locale
            }));
          }

          break;
        }

      default:
        {
          helpData.commands = astCommands.filter(function (item) {
            return item.key === argv.command[1];
          })[0];
          helpData.usage = {
            key: "$ muniz ".concat(argv.command[1], " [options]"),
            description: ''
          };
          render( /*#__PURE__*/_react["default"].createElement(_inkUi.Help, {
            data: helpData,
            show: "options"
          }));
          break;
        }
    }

    process.exit();
  } else {
    next();
  }
};

var _default = helpCommand;
exports["default"] = _default;