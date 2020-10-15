'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _cleanOptions = require('../../../lib/cleanOptions');

/**
 * 格式化 命令行 argv
 */

/**
 * 输入格式，如下
 *
 * [create, -a, --project-name=test]
 *
 * 输出 清洗过的 argv，格式如下
 *
 * {
 *    input: [create],
 *    options: { a: true, projectName: test },
 * }
 *
 */
var formatArgv = function formatArgv(ctx, next) {
  var argv = ctx.argv;
  var newArgv = {
    input: [],
    options: {},
  };
  argv.forEach(function (item) {
    if (!/^\-{1,2}/.test(item)) {
      newArgv.input.push(item);
    } else {
      var temp = item.split('=');
      temp[0] = temp[0].replace(/^\-{1,2}/, '');
      temp[0] = temp[0].replace(/-(\w)/g, function (_, c) {
        return c ? c.toUpperCase() : '';
      });
      newArgv.options[temp[0]] = temp[1];
    }
  });
  ctx.argv = newArgv;
  next();
};

var _default = formatArgv;
exports['default'] = _default;
