const path = require('path');
const fs = require('fs-extra');
import { lowdb } from '../../../../lib/lowdb.js';
import { generateCommand } from '@muniz/servers';
import { lowdbAction } from '../../../../lib/lowdb.js';

const language = lowdbAction.getLanguageLocale();

const pro = async ({ argv, pkgPath }) => {
  if (argv.options?.type === 'desc') {
    const pluginLifeModule = require(path.join(pkgPath, '/dist/index.js')).default(1);
    const localesPath = path.join(pkgPath, '/dist/configs/locales');
    const descPath = path.join(pkgPath, '/src/command');
    const astCommands = await generateCommand(descPath, descPath);
    // 生成 多语言 国际化 帮助文档
    const astCommandsLanguages = {};
    pluginLifeModule.locales.forEach((language) => {
      const _astCommands = astCommands.map((item) => {
        const { description, options } = item;
        options.map((_options) => {
          return (_options.description = `${_options.description}++++`);
        });
        return { ...item, description: `${description}---`, options };
      });
      astCommandsLanguages[language] = _astCommands;
    });

    fs.writeJSONSync(path.join(pkgPath, '/dist/configs/commandHelp.json'), astCommandsLanguages)[language];
  } else if (argv.options?.type === 'plugin') {
    lowdb.set('MUNIZ_PLUGIN_DEV', false).write();
    console.log('\n「 脚手架插件 」生产模式 - 开启成功');
  } else {
    console.log('主muniz控制器 生产者模式');
  }
};
export default pro;
