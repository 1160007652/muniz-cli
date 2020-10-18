'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
var _exportNames = {
  CommandApp: true,
};
exports.CommandApp = void 0;

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'));

var _asyncToGenerator2 = _interopRequireDefault(require('@babel/runtime/helpers/asyncToGenerator'));

var _classCallCheck2 = _interopRequireDefault(require('@babel/runtime/helpers/classCallCheck'));

var _createClass2 = _interopRequireDefault(require('@babel/runtime/helpers/createClass'));

var _middleWare = require('./middleWare');

Object.keys(_middleWare).forEach(function (key) {
  if (key === 'default' || key === '__esModule') return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _middleWare[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _middleWare[key];
    },
  });
});

/**
 * 命令行中间件解析应用
 */
var CommandApp = /*#__PURE__*/ (function () {
  function CommandApp(_ref) {
    var _ref$argv = _ref.argv,
      argv = _ref$argv === void 0 ? [] : _ref$argv,
      _ref$commands = _ref.commands,
      commands = _ref$commands === void 0 ? [] : _ref$commands,
      _ref$render = _ref.render,
      render = _ref$render === void 0 ? null : _ref$render;
    (0, _classCallCheck2['default'])(this, CommandApp);
    this.context = {
      commands: commands,
      // 内置命令
      pkg: {},
      // 命令，所在的包信息
      pkgName: '',
      // 命令，所在的包名
      pkgPath: '',
      // 命令，所在的包路径
      isUpdate: false,
      // 命令，所在的包是否有更新
      argv: argv,
      // 解析的运行命令参数
      render: render,
    }; // 中间件数组

    this.middleware = [];
  }
  /**
   * 使用中间件
   * @param {function} fn 中间件方法
   */

  (0, _createClass2['default'])(CommandApp, [
    {
      key: 'use',
      value: function use(fn) {
        this.middleware.push(fn);
      },
      /**
       * 负责执行中间件函数的函数
       * @param {array} middleware 中间件数组
       * @return {function}
       */
    },
    {
      key: 'compose',
      value: function compose(middleware) {
        // compose方法返回值是一个函数，这个函数返回值是一个promise对象
        return function (ctx) {
          var dispatch = function dispatch(i) {
            // 取出中间件函数
            var _middlewareFn = middleware[i]; // 如果取出的中间件数据不是函数（为假）, 就结束中间件递归

            if (!_middlewareFn) return Promise.resolve();
            return Promise.resolve(_middlewareFn(ctx, dispatch.bind(null, i + 1)));
          }; // 初始化调用第一个中间件函数

          return dispatch(0);
        };
      },
    },
    {
      key: 'start',
      value: (function () {
        var _start = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee() {
            var _fn;

            return _regenerator['default'].wrap(
              function _callee$(_context) {
                while (1) {
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      _fn = this.compose(this.middleware);
                      _context.next = 3;
                      return _fn(this.context);

                    case 3:
                    case 'end':
                      return _context.stop();
                  }
                }
              },
              _callee,
              this,
            );
          }),
        );

        function start() {
          return _start.apply(this, arguments);
        }

        return start;
      })(),
    },
  ]);
  return CommandApp;
})();

exports.CommandApp = CommandApp;
