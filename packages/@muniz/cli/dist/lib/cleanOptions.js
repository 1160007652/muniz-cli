'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.cleanOptions = void 0;

/**
 * 根据 flags 生成, help 帮助文档 options 描述信息
 * @param {object} _options meow flags 字段属性数据，也是 config 中的 cliOptions数据
 */
var cleanOptions = function cleanOptions(_options) {
  var cliOptions = Object.keys(_options).map(function (item) {
    var _options$item, _options$item3, _options$item4;

    var command = item.replace(/([A-Z])/g, function (_, c) {
      return c ? '-'.concat(c.toLocaleLowerCase()) : '';
    });
    command = '--'.concat(command);

    if ((_options$item = _options[item]) === null || _options$item === void 0 ? void 0 : _options$item.alias) {
      var _options$item2;

      command = ''
        .concat(command, ', -')
        .concat(
          (_options$item2 = _options[item]) === null || _options$item2 === void 0 ? void 0 : _options$item2.alias,
        );
    }

    return {
      command: command,
      desc: (_options$item3 = _options[item]) === null || _options$item3 === void 0 ? void 0 : _options$item3.desc,
      default:
        (_options$item4 = _options[item]) === null || _options$item4 === void 0 ? void 0 : _options$item4['default'],
    };
  });
  return cliOptions;
};

exports.cleanOptions = cleanOptions;
