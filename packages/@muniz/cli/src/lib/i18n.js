const pkgInfo = require('../../package.json');
const MunizConfig = require('../configs/system.json');

import languages from '../configs/locales';
import i18n from '@muniz/cli-i18n';

// 获取多语言
const getLocale = i18n.getLocale(pkgInfo.name);

// 初始化多语言
const initI18n = () => {
  i18n.setlanguages({ scope: pkgInfo.name, languages });
  i18n.setLocale({ locale: MunizConfig.languageLocale });
};

// 当前语言
const currentLocale = MunizConfig.languageLocale;

// 导出工具
export default { initI18n, getLocale, currentLocale };
