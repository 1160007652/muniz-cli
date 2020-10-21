"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

/**
 * 合并 argv 中的 options 对象数据, 实现如下几点：
 * - 将（alias）别名转化为全量的名称；
 * - 转化options类型(type)；
 * - 赋值默认值， 将给定的参数进行默认值赋值；
 *
 */
var mergeArgv = function mergeArgv(ctx, next) {
  var pkgName = ctx.pkgName,
      argv = ctx.argv,
      env = ctx.env;
  var newOptions = {};

  if (env.command === 'plugin') {
    ctx.currentModule = require(pkgName)["default"];
  }

  var _ctx$currentModule = ctx.currentModule,
      cliConfig = _ctx$currentModule.cliConfig,
      i18nLocales = _ctx$currentModule.i18nLocales; // console.log(cliConfig);

  Object.keys(argv.options).forEach(function (item) {
    // 不复制 没有被用户添加的选项参数-数据
    if (!['function', 'undefined'].includes((0, _typeof2["default"])(argv.options[item]))) {
      newOptions[item] = argv.options[item];
    }
  });
  argv.options = newOptions;
  next();
};

var _default = mergeArgv;
exports["default"] = _default;