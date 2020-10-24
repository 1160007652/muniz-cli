"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _parseCommand = require("./parseCommand");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _require = require('util'),
    promisify = _require.promisify;

var _require2 = require('path'),
    join = _require2.join,
    relative = _require2.relative,
    extname = _require2.extname,
    parse = _require2.parse;

var fs = require('fs');

var stat = promisify(fs.stat);

var generateCommand = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(commandsPath, dirPath) {
    var paths, commands, promises;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            paths = fs.readdirSync(dirPath);
            commands = [];
            promises = paths.map( /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(path) {
                var fullPath, stats, subCommands, indexCommand, command, _parse, name, isIndex;

                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        // Since `readdir` returns relative paths, we need to transform them to absolute paths
                        fullPath = join(dirPath, path);
                        _context.next = 3;
                        return stat(fullPath);

                      case 3:
                        stats = _context.sent;

                        if (!stats.isDirectory()) {
                          _context.next = 10;
                          break;
                        }

                        _context.next = 7;
                        return generateCommand(commandsPath, fullPath);

                      case 7:
                        subCommands = _context.sent;
                        indexCommand = subCommands.find(function (command) {
                          return command.isIndex;
                        }) || {
                          isDefaultIndex: true
                        };
                        commands.push(_objectSpread(_objectSpread({}, indexCommand), {}, {
                          isIndex: false,
                          name: path // subCommands: subCommands.filter((command) => !command.isIndex),

                        }));

                      case 10:
                        if (!(stats.isFile() && ['.js', '.tsx'].includes(extname(fullPath)))) {
                          _context.next = 17;
                          break;
                        }

                        _context.next = 13;
                        return (0, _parseCommand.parseCommand)(fullPath);

                      case 13:
                        command = _context.sent;
                        _parse = parse(fullPath), name = _parse.name;
                        isIndex = name === 'index';
                        commands.push(_objectSpread(_objectSpread({}, command), {}, {
                          isIndex: isIndex,
                          name: isIndex ? '*' : name,
                          path: relative(commandsPath, fullPath) // subCommands: [],

                        }));

                      case 17:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x3) {
                return _ref2.apply(this, arguments);
              };
            }());
            _context2.next = 5;
            return Promise.all(promises);

          case 5:
            return _context2.abrupt("return", commands);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function generateCommand(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _default = generateCommand;
exports["default"] = _default;