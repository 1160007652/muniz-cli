'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _regenerator = _interopRequireDefault(require('@babel/runtime/regenerator'));

var _asyncToGenerator2 = _interopRequireDefault(require('@babel/runtime/helpers/asyncToGenerator'));

var _classCallCheck2 = _interopRequireDefault(require('@babel/runtime/helpers/classCallCheck'));

var _createClass2 = _interopRequireDefault(require('@babel/runtime/helpers/createClass'));

/**
 * 命令行中间件解析应用
 */
var CommandApplication = /*#__PURE__*/ (function () {
  function CommandApplication(_ref) {
    var _ref$argv = _ref.argv,
      argv = _ref$argv === void 0 ? [] : _ref$argv;
    (0, _classCallCheck2['default'])(this, CommandApplication);
    this.context = {
      pkg: '运行包信息',
      pathName: '运行路径',
      isUpdate: '是否有更新',
      argv: argv, // 解析的运行命令参数
    }; // 中间件数组

    this.middleware = [];
  }
  /**
   * 使用中间件
   * @param {function} fn 中间件方法
   */

  (0, _createClass2['default'])(CommandApplication, [
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
  return CommandApplication;
})();

var _default = CommandApplication;
exports['default'] = _default;
