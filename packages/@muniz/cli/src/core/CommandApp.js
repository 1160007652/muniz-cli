/**
 * 命令行中间件解析应用
 */

class CommandApp {
  constructor({ argv = [], render = null, pkg = null }) {
    this.context = {
      pkg,
      pathName: '运行路径',
      isUpdate: '是否有更新',
      argv, // 解析的运行命令参数
      render,
    };
    // 中间件数组
    this.middleware = [];
  }

  /**
   * 使用中间件
   * @param {function} fn 中间件方法
   */
  use(fn) {
    this.middleware.push(fn);
  }

  /**
   * 负责执行中间件函数的函数
   * @param {array} middleware 中间件数组
   * @return {function}
   */
  compose(middleware) {
    // compose方法返回值是一个函数，这个函数返回值是一个promise对象
    return (ctx) => {
      const dispatch = (i) => {
        // 取出中间件函数
        const _middlewareFn = middleware[i];

        // 如果取出的中间件数据不是函数（为假）, 就结束中间件递归
        if (!_middlewareFn) return Promise.resolve();

        return Promise.resolve(_middlewareFn(ctx, dispatch.bind(null, i + 1)));
      };

      // 初始化调用第一个中间件函数
      return dispatch(0);
    };
  }

  async start() {
    const _fn = this.compose(this.middleware);
    await _fn(this.context);
  }
}

export { CommandApp };
export * from './middleWare';
