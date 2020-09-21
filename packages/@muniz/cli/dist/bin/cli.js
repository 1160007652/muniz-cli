#!/usr/bin/env node
'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'));

var _interopRequireWildcard2 = _interopRequireDefault(require('@babel/runtime/helpers/interopRequireWildcard'));

var _asyncToGenerator2 = _interopRequireDefault(require('@babel/runtime/helpers/asyncToGenerator'));

var _react = _interopRequireDefault(require('react'));

var _ink = require('ink');

var _meow = _interopRequireDefault(require('meow'));

var _ui = require('../ui');

var _config = require('../config');

var program = (0, _meow['default'])({
  flags: {
    help: {
      type: 'boolean',
      alias: 'h',
    },
    version: {
      type: 'boolean',
      alias: 'v',
    },
  },
  autoHelp: false,
});
var commander = {
  add: function add() {
    console.log('安装插件');
  },
};

function _start() {
  return _start2.apply(this, arguments);
} // console.log(cli);

function _start2() {
  _start2 = (0, _asyncToGenerator2['default'])(
    /*#__PURE__*/ _regenerator['default'].mark(function _callee() {
      var input, flags, _yield$import, plugin, config;

      return _regenerator['default'].wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                /**
                 * @description 输入命令小于 2 位,打印 使用帮助文档
                 */
                if (!process.argv.slice(2).length) {
                  // program.showHelp();
                  (0, _ink.render)(
                    /*#__PURE__*/ _react['default'].createElement(_ui.UI_Help, {
                      flags: program.flags,
                      data: _config.cliHelp,
                    }),
                  );
                }

                (input = program.input), (flags = program.flags);

                if (input.length === 0 && flags.help) {
                  (0, _ink.render)(
                    /*#__PURE__*/ _react['default'].createElement(_ui.UI_Help, {
                      flags: program.flags,
                      data: _config.cliHelp,
                    }),
                  );
                  process.exit();
                }

                if (input.length > 0 && flags.help && input[0] in commander) {
                  console.log('打印子命令 help 文档');
                  process.exit();
                }

                if (!(input.length > 0)) {
                  _context.next = 22;
                  break;
                }

                if (!([input[0]] in commander)) {
                  _context.next = 9;
                  break;
                }

                commander === null || commander === void 0
                  ? void 0
                  : commander[input[0]]({
                      input: input,
                      flags: flags,
                    });
                _context.next = 22;
                break;

              case 9:
                _context.prev = 9;
                _context.next = 12;
                return Promise.resolve('@muniz/muniz-plugin-'.concat(input[0])).then(function (s) {
                  return (0, _interopRequireWildcard2['default'])(require(s));
                });

              case 12:
                _yield$import = _context.sent;
                plugin = _yield$import['default'];
                config = plugin.config;

                if (flags.help) {
                  (0, _ink.render)(
                    /*#__PURE__*/ _react['default'].createElement(_ui.UI_Help, {
                      flags: program.flags,
                      data: config.cliHelp,
                    }),
                  );
                } // 执行插件 默认命令

                if (input.length === 1) {
                  if (plugin === null || plugin === void 0 ? void 0 : plugin['default']) {
                    if (plugin['default'] === 'help') {
                      (0, _ink.render)(
                        /*#__PURE__*/ _react['default'].createElement(_ui.UI_Help, {
                          flags: program.flags,
                          data: config.cliHelp,
                        }),
                      );
                    } else if (plugin['default'] in plugin && !['config'].includes(plugin['default'])) {
                      plugin[plugin['default']](program);
                    } else {
                      console.log('\u63D2\u4EF6\u4E0D\u5B58\u5728\u547D\u4EE4 '.concat(input[0]), e);
                    }
                  }
                } else if (input.length >= 2) {
                  if (input[1] in plugin && !['config'].includes(input[1])) {
                    // 执行 插件的 非默认 子命令
                    plugin[input[1]](program);
                  } else {
                    console.log('\u63D2\u4EF6\u4E0D\u5B58\u5728\u547D\u4EE4 '.concat(input[1]));
                  }
                }

                _context.next = 22;
                break;

              case 19:
                _context.prev = 19;
                _context.t0 = _context['catch'](9);
                console.log(''.concat(input[0], ' \u63D2\u4EF6\u4E0D\u5B58\u5728'));

              case 22:
              case 'end':
                return _context.stop();
            }
          }
        },
        _callee,
        null,
        [[9, 19]],
      );
    }),
  );
  return _start2.apply(this, arguments);
}

_start();
