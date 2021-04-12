/**
 * 中间件 => 统一捕捉错误信息
 */
const errorExpand = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    if (process.env.CLI_ENV === 'development') {
      console.log(error.message);
      // console.log(error);
    } else {
      console.log(error.message);
    }
  }
};

export default errorExpand;
