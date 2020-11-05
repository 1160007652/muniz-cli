"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _inkUi = require("@muniz/ink-ui");

var _cliI18n = _interopRequireDefault(require("@muniz/cli-i18n"));

/**
 * 显示帮助命令
 */
var versionCommand = function versionCommand(ctx, next) {
  var _argv$options;

  var pkg = ctx.pkg,
      argv = ctx.argv,
      render = ctx.render;

  if ((_argv$options = argv.options) === null || _argv$options === void 0 ? void 0 : _argv$options.version) {
    render( /*#__PURE__*/_react["default"].createElement(_inkUi.Version, {
      pkg: pkg,
      locale: _cliI18n["default"].locale
    }));
    process.exit();
  } else {
    next();
  }
};

var _default = versionCommand;
exports["default"] = _default;