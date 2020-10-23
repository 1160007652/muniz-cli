class Life {
  constructor() {
    // 安装成功后是否立即执行
    this.isStart = true;
    this.locales = ['zh', 'cn']; // 插件支持的国际化语言
  }

  footer() {
    return '我是帮助文档底部描述信息';
  }

  header() {
    return '我是帮助文档顶部描述信息';
  }
}

export default Life;
