const path = require('path');
const fs = require('fs-extra');
import { lowdb } from '../../../../lib/lowdb.js';
import { generateCommand } from '@muniz/servers';
import i18n from '../../../../lib/i18n';

const pro = async ({ argv, pkgPath }) => {
  if (argv.options?.type === 'desc') {
    const localesModule = require(path.join(pkgPath, '/configs/locales/index.js')).default;
    console.log(pkgPath, localesModule);
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
    fs.writeJSONSync(path.join(pkgPath, '/configs/commandHelp.json'), astCommandsLanguages);
  } else if (argv.options?.type === 'plugin') {
    lowdb.set('MUNIZ_PLUGIN_DEV', false).write();
    console.log(`\n ${i18n.getLocale('mode_pro_plugin_tips')}`);
  } else {
    console.log(i18n.getLocale('mode_pro_tips'));
  }
};
export default pro;
