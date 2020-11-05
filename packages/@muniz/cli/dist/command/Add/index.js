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
    var input, pluginCorrectList, pluginFail, pluginSucced, spinner, _loop, _i, _pluginCorrectList;

    return _regenerator["default"].wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            input = _ref.input;

            if (input.length < 0) {
              console.log('请输入要安装的插件');
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
                  tips: '不是「 Muniz CLI 」 脚手架插件'
                });
              } else {
                pluginCorrectList.push({
                  shortName: shortName,
                  pkgName: item
                });
              }
            });
            spinner = ora();
            spinner.start('正在安装中，请稍等片刻');
            _loop = /*#__PURE__*/_regenerator["default"].mark(function _loop() {
              var _pluginCorrectList$_i, shortName, pkgName;

              return _regenerator["default"].wrap(function _loop$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _pluginCorrectList$_i = _pluginCorrectList[_i], shortName = _pluginCorrectList$_i.shortName, pkgName = _pluginCorrectList$_i.pkgName;
                      _context.next = 3;
                      return execa.command("npm install -g ".concat(pkgName)).then(function () {
                        // 向系统配置文件中，保存安装插件记录
                        _lowdb.lowdbAction.addPluginPkg({
                          shortName: shortName,
                          pkgName: pkgName
                        });

                        pluginSucced.push({
                          shortName: shortName,
                          pkgName: pkgName
                        }); // 在 MAC 系统中，检查自动执行事件

                        if (os.type() === 'Darwin') {
                          var pluginModule = require(pkgName)["default"]({
                            locale: MunizConfig.languageLocale
                          });

                          if (pluginModule === null || pluginModule === void 0 ? void 0 : pluginModule.isStart) {
                            var osascriptContent = "\n                  tell application \"Terminal\"\n                    activate\n                    do script \"muniz ".concat(shortName, "\"\n                  end tell\n                ");
                            execa.commandSync("osascript -e '".concat(osascriptContent, "'"), {
                              shell: true
                            });
                          }
                        }
                      })["catch"](function () {
                        pluginFail.push({
                          shortName: shortName,
                          pkgName: pkgName,
                          tips: '请检查 npm 镜像，是否存在该插件包！'
                        });
                      });

                    case 3:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _loop);
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
            spinner.succeed('安装结束');
            console.log('---------------------------------\n');
            pluginSucced.length > 0 && console.log('- 列表·安装成功\n');
            pluginSucced.forEach(function (_plugin) {
              console.log("\u3010".concat(_plugin.pkgName, "\u3011\u63D2\u4EF6\uFF0C\u4F7F\u7528\u547D\u4EE4 muniz ").concat(_plugin.shortName));
            });
            pluginFail.length > 0 && console.log('\n- 列表·安装失败\n');
            pluginFail.forEach(function (_plugin) {
              console.log("\u3010".concat(_plugin.pkgName, "\u3011\u539F\u56E0\uFF1A").concat(_plugin.tips));
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