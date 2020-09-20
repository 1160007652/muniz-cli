#!/usr/bin/env node
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _interopRequireWildcard2 = _interopRequireDefault(require("@babel/runtime/helpers/interopRequireWildcard"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _react = _interopRequireDefault(require("react"));

var _ink = require("ink");

var _meow = _interopRequireDefault(require("meow"));

var _ui = require("../ui");

var program = (0, _meow["default"])({
  flags: {
    help: {
      type: 'boolean',
      alias: 'h'
    },
    version: {
      type: 'boolean',
      alias: 'v'
    }
  },
  autoHelp: false
});

function _start() {
  return _start2.apply(this, arguments);
} // console.log(cli);


function _start2() {
  _start2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var input, flags, commander, _yield$import, plugin;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            /**
             * @description 输入命令小于 2 位,打印 使用帮助文档
             */
            if (!process.argv.slice(2).length) {
              // program.showHelp();
              (0, _ink.render)( /*#__PURE__*/_react["default"].createElement(_ui.UI_Command, program.flags));
            }

            input = program.input, flags = program.flags;

            if (input.length === 0 && flags.help) {
              (0, _ink.render)( /*#__PURE__*/_react["default"].createElement(_ui.UI_Command, program.flags));
              process.exit();
            }

            if (input.length > 0 && flags.help) {
              console.log('打印子命令 help 文档');
              process.exit();
            }

            if (!(input.length > 0 && !flags.help)) {
              _context.next = 21;
              break;
            }

            commander = {
              create: function create(options) {
                (0, _ink.render)( /*#__PURE__*/_react["default"].createElement(_ui.UI_Create, options));
              },
              add: function add() {
                console.log('安装插件');
              }
            }; // 执行子命令

            if (!([input[0]] in commander)) {
              _context.next = 10;
              break;
            }

            commander === null || commander === void 0 ? void 0 : commander[input[0]]({
              input: input,
              flags: flags
            });
            _context.next = 21;
            break;

          case 10:
            _context.prev = 10;
            _context.next = 13;
            return Promise.resolve("@muniz/muniz-plugin-".concat(input[0])).then(function (s) {
              return (0, _interopRequireWildcard2["default"])(require(s));
            });

          case 13:
            _yield$import = _context.sent;
            plugin = _yield$import["default"];
            console.log(plugin);
            _context.next = 21;
            break;

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](10);
            console.log("\u4E0D\u5B58\u5728\u547D\u4EE4 ".concat(input[0]));

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[10, 18]]);
  }));
  return _start2.apply(this, arguments);
}

_start();