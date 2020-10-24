class Life {
  constructor() {
    // 安装成功后是否立即执行
    this.isStart = true;
    this.locales = ['zh', 'cn']; // 插件支持的国际化语言
    this.defaultCommand = 'create'; // 插件默认执行命令, 以 muniz 插件名 运行时，执行那条命令，无配置 为 cli 打印 help 命令
  }

  footer() {
    return '我是帮助文档底部描述信息';
  }

  header() {
    return '我是帮助文档顶部描述信息';
  }
}

export default (props) => {
  return new Life();
};
