'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = cleanArgv;

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
 * @param {array} argv 命令行参数
 */
function cleanArgv(argv) {
  var newArgv = {
    command: [],
    input: [],
    options: {},
  };

  argv._.forEach(function (item, index) {
    if (index < 2) {
      newArgv.command.push(item);
    } else {
      newArgv.input.push(item);
    }
  });

  Object.keys(argv).forEach(function (item) {
    if (item !== '_') {
      var tempKey = item.replace(/-(\w)/g, function (_, c) {
        return c ? c.toUpperCase() : '';
      });

      if (['help', 'version', 'h', 'v'].includes(tempKey)) {
        newArgv.options[tempKey] = true;
      } else {
        newArgv.options[tempKey] = argv[item];
      }
    }
  });
  return newArgv;
}
