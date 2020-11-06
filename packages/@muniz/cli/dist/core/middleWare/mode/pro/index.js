"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lowdb = require("../../../../lib/lowdb.js");

var _servers = require("@muniz/servers");

var _i18n = _interopRequireDefault(require("../../../../lib/i18n"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var path = require('path');

var fs = require('fs-extra');

var pro = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var _argv$options, _argv$options2;

    var argv, pkgPath, localesModule, descPath, astCommands, languageList, astCommandsLanguages;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            argv = _ref.argv, pkgPath = _ref.pkgPath;

            if (!(((_argv$options = argv.options) === null || _argv$options === void 0 ? void 0 : _argv$options.type) === 'desc')) {
              _context.next = 13;
              break;
            }

            localesModule = require(path.join(pkgPath, '/dist/configs/locales/index.js'))["default"];
            descPath = path.join(pkgPath, '/src/command');
            _context.next = 6;
            return (0, _servers.generateCommand)(descPath, descPath);

          case 6:
            astCommands = _context.sent;
            languageList = Object.keys(localesModule); // 遍历出 keys
            // 生成 多语言 国际化 帮助文档

            astCommandsLanguages = {};
            languageList.forEach(function (language) {
              var _astCommands = astCommands.map(function (item) {
                var options = item.options.map(function (_options) {
                  return _objectSpread(_objectSpread({}, _options), {}, {
                    description: localesModule[language][_options.description] || _options.description
                  });
                });
                return _objectSpread(_objectSpread({}, item), {}, {
                  description: localesModule[language][item.description] || item.description,
                  options: options
                });
              });

              astCommandsLanguages[language] = _astCommands;
            });
            fs.writeJSONSync(path.join(pkgPath, '/dist/configs/commandHelp.json'), astCommandsLanguages);
            _context.next = 14;
            break;

          case 13:
            if (((_argv$options2 = argv.options) === null || _argv$options2 === void 0 ? void 0 : _argv$options2.type) === 'plugin') {
              _lowdb.lowdb.set('MUNIZ_PLUGIN_DEV', false).write();

              console.log("\n ".concat(_i18n["default"].getLocale('mode_pro_plugin_tips')));
            } else {
              console.log(_i18n["default"].getLocale('mode_pro_tips'));
            }

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function pro(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = pro;
exports["default"] = _default;