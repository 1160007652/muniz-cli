const path = require('path');
import { generateCommand } from '@muniz/servers';

async function i18nCommand({ pkgPath }) {
  const localesModule = require(`${pkgPath}/configs/locales/index.js`).default;

  // 只从源码中 转换AST 语法树，提取 “命令” 的注释信息
  const descPath = path.join(pkgPath, '../src/command');

  const astCommands = await generateCommand(descPath, descPath);
  const languageList = Object.keys(localesModule); // 遍历出 keys
  // 生成 多语言 国际化 帮助文档
  const astCommandsLanguages = {};
  languageList.forEach((language) => {
    const _astCommands = astCommands.map((item) => {
      const options = item.options.map((_options) => {
        return { ..._options, description: localesModule[language][_options.description] || _options.description };
      });
      return { ...item, description: localesModule[language][item.description] || item.description, options };
    });
    astCommandsLanguages[language] = _astCommands;
  });

  return astCommandsLanguages;
}
export default i18nCommand;
