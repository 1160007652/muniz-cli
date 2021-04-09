const MunizConfig = require('../../../configs/system.json');
import i18n from '../../../lib/i18n';

/**
 * 中间件 => 统一捕捉错误信息
 */
const errorExpand = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    if (MunizConfig.MUNIZ_CLI_DEBUG) {
      console.log(error.message);
      // console.log(error);
    } else {
      console.log(error.message);
    }
  }
};

export default errorExpand;
