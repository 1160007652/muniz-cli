const path = require('path');
const fs = require('fs-extra');

import { generateCommand } from '@muniz/servers';

const pro = async ({ argv, pkgPath }) => {
  console.log('主muniz控制器 生产者模式');

  if (argv.options?.type === 'desc') {
    const descPath = path.join(pkgPath, '/src/command');

    const astCommands = await generateCommand(descPath, descPath);
    fs.writeJSONSync(path.join(pkgPath, '/dist/configs/commandHelp.json'), astCommands);
  }
};
export default pro;
