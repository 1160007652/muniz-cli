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

var _cliI18n = _interopRequireDefault(require("@muniz/cli-i18n"));

var MunizConfig = require('../../configs/system.json');

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
    var input, pluginCorrectList, pluginFail, pluginSucced, spinner, _i, _pluginCorrectList, _pluginCorrectList$_i, shortName, pkgName, pluginModule, osascriptContent;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            input = _ref.input;

            if (input.length < 1) {
              console.log(_cliI18n["default"].getLocale('add_command_empty_tips'));
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
                  tips: _cliI18n["default"].getLocale('add_command_no_plugin1')
                });
              } else {
                pluginCorrectList.push({
                  shortName: shortName,
                  pkgName: item
                });
              }
            });
            spinner = ora();
            spinner.start(_cliI18n["default"].getLocale('add_command_installing'));
            _i = 0, _pluginCorrectList = pluginCorrectList;

          case 9:
            if (!(_i < _pluginCorrectList.length)) {
              _context.next = 26;
              break;
            }

            _pluginCorrectList$_i = _pluginCorrectList[_i], shortName = _pluginCorrectList$_i.shortName, pkgName = _pluginCorrectList$_i.pkgName;
            _context.prev = 11;
            _context.next = 14;
            return execa.command("npm install -g ".concat(pkgName), {
              shell: true
            });

          case 14:
            _context.next = 16;
            return _lowdb.lowdbAction.addPluginPkg({
              shortName: shortName,
              pkgName: pkgName
            });

          case 16:
            pluginSucced.push({
              shortName: shortName,
              pkgName: pkgName
            }); // 在 MAC 系统中，检查自动执行事件

            if (os.type() === 'Darwin') {
              pluginModule = require(pkgName)["default"]({
                locale: MunizConfig.languageLocale
              });

              if (pluginModule === null || pluginModule === void 0 ? void 0 : pluginModule.isStart) {
                osascriptContent = "\n                tell application \"Terminal\"\n                  activate\n                  do script \"muniz ".concat(shortName, "\"\n                end tell\n              ");
                execa.commandSync("osascript -e '".concat(osascriptContent, "'"), {
                  shell: true
                });
              }
            }

            _context.next = 23;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](11);
            pluginFail.push({
              shortName: shortName,
              pkgName: pkgName,
              tips: _cliI18n["default"].getLocale('add_command_check_npm_tips')
            });

          case 23:
            _i++;
            _context.next = 9;
            break;

          case 26:
            spinner.succeed(_cliI18n["default"].getLocale('add_command_installed'));
            (pluginSucced.length > 0 || pluginFail.length > 0) && console.log('\n---------------------------------');
            pluginSucced.length > 0 && console.log("\n- ".concat(_cliI18n["default"].getLocale('add_command_plugin_success_list'), "\n"));
            pluginSucced.forEach(function (_ref3) {
              var pkgName = _ref3.pkgName,
                  shortName = _ref3.shortName;
              console.log(_cliI18n["default"].getLocale('add_command_plugin_success_tips', {
                pkgName: pkgName,
                shortName: shortName
              }));
            });
            pluginFail.length > 0 && console.log("\n- ".concat(_cliI18n["default"].getLocale('add_command_plugin_fail_list'), "\n"));
            pluginFail.forEach(function (_ref4) {
              var pkgName = _ref4.pkgName,
                  tips = _ref4.tips;
              console.log(_cliI18n["default"].getLocale('add_command_plugin_fail_tips', {
                pkgName: pkgName,
                tips: tips
              }));
            });

          case 32:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[11, 20]]);
  }));

  return function Add(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = Add;
exports["default"] = _default;