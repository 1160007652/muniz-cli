'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.lowdb = exports.lowdbAction = void 0;

var _toConsumableArray2 = _interopRequireDefault(require('@babel/runtime/helpers/toConsumableArray'));

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'));

var _defineProperty2 = _interopRequireDefault(require('@babel/runtime/helpers/defineProperty'));

var _asyncToGenerator2 = _interopRequireDefault(require('@babel/runtime/helpers/asyncToGenerator'));

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        (0, _defineProperty2['default'])(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}

var path = require('path');

var inquirer = require('inquirer');

var DataSource = require('lowdb');

var FileSync = require('lowdb/adapters/FileSync');

var adapter = new FileSync(path.resolve(__dirname, '../configs/system.json'));
var lowdb = DataSource(adapter); // 默认脚手架 配置数据

exports.lowdb = lowdb;
var defaultSystemData = {
  MUNIZ_CLI_DEBUG: false,
  MUNIZ_PLUGIN_DEV: false,
  plugins: [],
};
lowdb.defaults(defaultSystemData).write();
var lowdbAction = {
  /**
   *
   * @param {obejct} param
   * @param {string} param.shortName 插件短名称，执行命令 取自 [scope]/muniz-plugin-(.*?) 匹配
   *
   */
  getPluginPkgName: function getPluginPkgName(_ref) {
    return (0, _asyncToGenerator2['default'])(
      /*#__PURE__*/ _regenerator['default'].mark(function _callee() {
        var shortName, pkgNameList, promptList, answers;
        return _regenerator['default'].wrap(function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                shortName = _ref.shortName;
                pkgNameList = lowdb
                  .get('plugins')
                  .filter({
                    shortName: shortName,
                  })
                  .map(function (item) {
                    return _objectSpread(
                      {
                        value: item.pkgName,
                      },
                      item,
                    );
                  })
                  .value(); // 如果 = 0 表示 没有这个 插件

                if (!(pkgNameList.length === 0)) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt('return', '');

              case 4:
                if (!(pkgNameList.length === 1)) {
                  _context.next = 7;
                  break;
                }

                // 清除控制台内容
                console.clear();
                return _context.abrupt('return', pkgNameList[0].pkgName);

              case 7:
                if (!(pkgNameList.length > 1)) {
                  _context.next = 14;
                  break;
                }

                promptList = [
                  {
                    type: 'list',
                    message: '检查到多个指令，请问执行哪一个',
                    name: 'pkgName',
                    default: '',
                    choices: pkgNameList,
                  },
                ];
                _context.next = 11;
                return inquirer.prompt(promptList);

              case 11:
                answers = _context.sent;
                // 清除控制台内容
                console.clear();
                return _context.abrupt('return', answers.pkgName);

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee);
      }),
    )();
  },

  /**
   *
   * @param {obejct} param
   * @param {string} param.shortName 插件短名称，执行命令 取自 [scope]/muniz-plugin-(.*?) 匹配
   * @param {string} param.pkgName 插件包名称，如 [scope]/muniz-plugin-xxx
   */
  addPluginPkg: function addPluginPkg(_ref2) {
    var shortName = _ref2.shortName,
      pkgName = _ref2.pkgName;
    // 先根据 全量 pkg 包名删除
    lowdb
      .get('plugins')
      .remove({
        pkgName: pkgName,
      })
      .write(); // 删除完，再进行安装

    lowdb
      .get('plugins')
      .push({
        shortName: shortName,
        pkgName: pkgName,
      })
      .write();
  },

  /**
   *
   * @description 获取插件已安装的插件列表
   * @returns 返回插件列表
   */
  getPluginPkgList: function getPluginPkgList() {
    var result = lowdb
      .get('plugins')
      .map(function (item, index) {
        return [index + 1].concat((0, _toConsumableArray2['default'])(Object.values(item)));
      })
      .value();
    return result;
  },

  /**
   * @description 删除插件
   */
  removePluginPkg: function removePluginPkg(_ref3) {
    var shortName = _ref3.shortName,
      pkgName = _ref3.pkgName;
    lowdb
      .get('plugins')
      .remove({
        pkgName: pkgName,
      })
      .write();
  },
};
exports.lowdbAction = lowdbAction;
