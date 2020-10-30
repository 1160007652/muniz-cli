const path = require('path');
const fs = require('fs-extra');
import { lowdb } from '../../../../lib/lowdb.js';
import { generateCommand } from '@muniz/servers';

const pro = async ({ argv, pkgPath }) => {
  if (argv.options?.type === 'desc') {
    const descPath = path.join(pkgPath, '/src/command');
    const astCommands = await generateCommand(descPath, descPath);
    fs.writeJSONSync(path.join(pkgPath, '/dist/configs/commandHelp.json'), astCommands);
  } else if (argv.options?.type === 'plugin') {
    lowdb.set('MUNIZ_PLUGIN_DEV', false).write();
    console.log('\n「 脚手架插件 」生产模式 - 开启成功');
  } else {
    console.log('主muniz控制器 生产者模式');
  }
};
export default pro;
