/** 导出 cli 属性 */
export const options = {
  name: {
    type: 'string',
    alias: 'n',
    default: '',
    desc: '项目名称',
  },
};

/** 导出 cli 帮助文档 */
export const help = {
  header: '国际化，多语言切换插件',
  footer: '承接展示广告',
  usages: [{ command: '$ muniz i18n <command> [options] ', desc: '' }],
  commands: [
    { command: '$ switch', desc: '切换语言' },
    { command: '$ list', desc: '显示支持的语种' },
  ],

  otherOptions: [
    { command: '-h, --help ', desc: '显示帮助文档' },
    { command: '-v, --version ', desc: '显示版本号' },
  ],
  examples: [{ command: '$ muniz i18n ', desc: '切换多语言' }],
};
