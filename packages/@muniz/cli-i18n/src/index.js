class Locale {
  constructor() {
    this.languages = {};
    this.locale = '';
  }
  /**
   * 获取多语言文案
   * @param {string} name , 多语言key
   * @param {*} options , 多语言替换“占位符”配置
   */
  getLocale(scope) {
    return (name, options) => {
      const text = this.languages[scope][this.locale][name];

      if (!text) {
        // return this.getLocale('language_not_found', { name, locale: this.locale });
        return `找不到对应的文案 - ${name}`;
      }

      let localText = text;

      if (/{.*?}/.test(localText)) {
        Object.keys(options || {}).forEach((key) => {
          const reg = new RegExp(`{${key}}`, 'g');
          localText = localText.replace(reg, options[key]);
        });
      }

      return localText;
    };
  }
  /**
   * 设置多语言
   * @param {object}} param
   * @param {string}} param.locale 多语言标识 ，如 zhCN、enUS
   */
  setLocale({ locale }) {
    this.locale = locale;
  }
  /**
   * 设置多语言数据集合
   * @param {object}} param
   * @param {object}} param.languages 多语言数据集合 ，如 {hello: '你好'}
   */
  setlanguages({ languages, scope }) {
    this.languages[scope] = languages;
  }
}

export default new Locale();
