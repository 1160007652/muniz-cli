"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lowdb = require("../../lib/lowdb.js");

var _i18n = _interopRequireDefault(require("../../lib/i18n"));

var execa = require('execa');

var os = require('os');

var ora = require('ora');
/**
 * @muniz
 * @type function
 * @description help_add_desc
 */


var Add = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var input, pluginCorrectList, pluginFail, pluginSucced, spinner, _loop, _i, _pluginCorrectList;

    return _regenerator["default"].wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            input = _ref.input;

            if (input.length < 1) {
              console.log(_i18n["default"].getLocale('add_command_empty_tips'));
              process.exit();
            }

            pluginCorrectList = []; // 正确的待安装插件列表

            pluginFail = []; // 失败的插件列表， {tips: '这里存放了错误的原因提示'}

            pluginSucced = []; // 成功的插件列表

            (0, _toConsumableArray2["default"])(new Set(input)).forEach(function (item) {
              var _shortName;

              var shortName = item.match(/.*?muniz-plugin-(.*?)$/);
              shortName = ((_shortName = shortName) === null || _shortName === void 0 ? void 0 : _shortName.length) > 1 ? shortName[1] : '';

              if (!shortName) {
                pluginFail.push({
                  shortName: shortName,
                  pkgName: item,
                  tips: _i18n["default"].getLocale('add_command_no_plugin1')
                });
              } else {
                pluginCorrectList.push({
                  shortName: shortName,
                  pkgName: item
                });
              }
            });
            spinner = ora();
            spinner.start(_i18n["default"].getLocale('add_command_installing'));
            _loop = /*#__PURE__*/_regenerator["default"].mark(function _loop() {
              var _pluginCorrectList$_i, shortName, pkgName;

              return _regenerator["default"].wrap(function _loop$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _pluginCorrectList$_i = _pluginCorrectList[_i], shortName = _pluginCorrectList$_i.shortName, pkgName = _pluginCorrectList$_i.pkgName;
                      _context.prev = 1;
                      _context.next = 4;
                      return execa.command("npm install ".concat(pkgName), {
                        shell: true
                      });

                    case 4:
                      _context.next = 6;
                      return _lowdb.lowdbAction.addPluginPkg({
                        shortName: shortName,
                        pkgName: pkgName
                      });

                    case 6:
                      pluginSucced.push({
                        shortName: shortName,
                        pkgName: pkgName
                      }); // 在 MAC 系统中，检查自动执行事件

                      (function () {
                        if (os.type() === 'Darwin') {
                          var pluginModule = require("".concat(pkgName))["default"]({
                            locale: _i18n["default"].currentLocale
                          });

                          if (pluginModule === null || pluginModule === void 0 ? void 0 : pluginModule.isStart) {
                            var osascriptContent = "\n                tell application \"Terminal\"\n                  activate\n                  do script \"muniz ".concat(shortName, "\"\n                end tell\n              ");
                            execa.commandSync("osascript -e '".concat(osascriptContent, "'"), {
                              shell: true
                            });
                          }
                        }
                      })();

                      _context.next = 14;
                      break;

                    case 10:
                      _context.prev = 10;
                      _context.t0 = _context["catch"](1);
                      console.log(_context.t0);
                      pluginFail.push({
                        shortName: shortName,
                        pkgName: pkgName,
                        tips: _i18n["default"].getLocale('add_command_check_npm_tips')
                      });

                    case 14:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _loop, null, [[1, 10]]);
            });
            _i = 0, _pluginCorrectList = pluginCorrectList;

          case 10:
            if (!(_i < _pluginCorrectList.length)) {
              _context2.next = 15;
              break;
            }

            return _context2.delegateYield(_loop(), "t0", 12);

          case 12:
            _i++;
            _context2.next = 10;
            break;

          case 15:
            spinner.succeed(_i18n["default"].getLocale('add_command_installed'));
            (pluginSucced.length > 0 || pluginFail.length > 0) && console.log('\n---------------------------------');
            pluginSucced.length > 0 && console.log("\n- ".concat(_i18n["default"].getLocale('add_command_plugin_success_list'), "\n"));
            pluginSucced.forEach(function (_ref3) {
              var pkgName = _ref3.pkgName,
                  shortName = _ref3.shortName;
              console.log(_i18n["default"].getLocale('add_command_plugin_success_tips', {
                pkgName: pkgName,
                shortName: shortName
              }));
            });
            pluginFail.length > 0 && console.log("\n- ".concat(_i18n["default"].getLocale('add_command_plugin_fail_list'), "\n"));
            pluginFail.forEach(function (_ref4) {
              var pkgName = _ref4.pkgName,
                  tips = _ref4.tips;
              console.log(_i18n["default"].getLocale('add_command_plugin_fail_tips', {
                pkgName: pkgName,
                tips: tips
              }));
            });

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee);
  }));

  return function Add(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = Add;
exports["default"] = _default;