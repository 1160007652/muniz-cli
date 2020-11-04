'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _lowdb = require('../../lib/lowdb.js');

var execa = require('execa');

var os = require('os');

var ora = require('ora');
/**
 * @muniz
 * @type function
 * @description help_add_desc
 */

var Add = function Add(_ref) {
  var input = _ref.input;
  var spinner = ora('安装中，等待...');

  if (input.length < 0) {
    console.log('不能为空');
  }

  var plugins = input.map(function (item) {
    var _shortName;

    var shortName = item.match(/.*?muniz-plugin-(.*?)$/);
    shortName =
      ((_shortName = shortName) === null || _shortName === void 0 ? void 0 : _shortName.length) > 1 ? shortName[1] : '';

    if (!shortName) {
      console.log(
        '\u8F93\u5165\u7684 \u201C'.concat(
          item,
          '\u201D \u4E0D\u662F\u300C Muniz \u300D \u811A\u624B\u67B6\u63D2\u4EF6',
        ),
      );
      process.exit();
    } else {
      return {
        shortName: shortName,
        pkgName: item,
      };
    }
  });
  var pluginNames = plugins
    .map(function (item) {
      return item.pkgName;
    })
    .join(' ');
  spinner.start();
  execa
    .command('npm install -g '.concat(pluginNames))
    .then(function () {
      // 向系统配置文件中，保存安装插件记录
      plugins.forEach(function (item) {
        _lowdb.lowdbAction.addPluginPkg(item);
      }); // 只在 MAC 系统下 启动（插件立即执行）功能

      if (os.type === 'Darwin') {
        var pluginModule = require(pkgList.pkgName)['default']();

        if (pluginModule.isStart) {
          //生成自启动脚本
          var osascriptContent = '\n            tell application "Terminal"\n              activate\n              do script "muniz '.concat(
            pkgList.shortName,
            '"\n            end tell\n          ',
          );
          execa.commandSync("osascript -e '".concat(osascriptContent, "'"), {
            shell: true,
          });
        }
      }

      spinner.succeed('安装成功');
    })
    ['catch'](function (_) {
      spinner.fail('安装失败, 请检查 npm 镜像，是否存在本次安装的插件包！');
    })
    ['finally'](function () {
      setTimeout(function () {
        process.exit();
      }, 100);
    });
};

var _default = Add;
exports['default'] = _default;
