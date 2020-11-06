const pkgInfo = require('../../package.json');
import languages from './locales';
import i18n from '@muniz/cli-i18n';

// 获取多语言
const getLocale = i18n.getLocale(pkgInfo.name);

// 设置多语言
const setLocale = ({ locale }) => {
  i18n.setLocale({ locale });
};

// 初始化多语言
const initI18n = () => {
  i18n.setlanguages({ scope: pkgInfo.name, languages });
};

// 导出工具
export default { initI18n, setLocale, getLocale };
