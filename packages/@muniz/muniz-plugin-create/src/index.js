import { render } from 'ink';
import React from 'react';
import i18n from './configs/i18n';
i18n.initI18n();

class PluginRoot {
  static isStart = true; // 安装成功后是否立即执行
  static autoUpgrade = true; // 是否动态感知最新版本，以实现自动升级

  /**
   * 静态方法，不可修改 muniz 脚手架（宿主环境）通过此通道执行插件命令
   * @param {object} param
   * @param {string} param.commandType 命令类型，react function
   * @param {string} param.commandPath 执行命令路径
   * @param {object} param.data 插件命令数据
   */
  static runPluginCommand = async ({ commandType, commandPath, data }) => {
    const _command = require(`./command/${commandPath}`).default;
    if (commandType === 'function') {
      await _command(data);
    } else {
      await render(React.createElement(_command, data));
    }
  };
}

export default (props) => {
  const { locale } = props;
  // 初始化多语言
  i18n.setLocale({ locale });
  return PluginRoot;
};
