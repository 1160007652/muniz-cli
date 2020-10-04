import intl from 'react-intl-universal';

export const initI18nLocales = ({ locales = null }) => {
  intl.init({
    currentLocale: 'zhCN',
    locales,
  });
};

export const i18n = intl;
