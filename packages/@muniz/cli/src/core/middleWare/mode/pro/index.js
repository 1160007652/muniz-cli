const path = require('path');
const fs = require('fs-extra');
import i18n from '../../../../lib/i18n';
import i18nCommand from '../../../../lib/i18nCommand';

const pro = async ({ argv, pkgPath }) => {
  if (argv.options?.type === 'desc') {
    const astCommandsLanguages = await i18nCommand({ pkgPath: pkgPath });
    fs.writeJSONSync(path.join(pkgPath, '/configs/commandHelp.json'), astCommandsLanguages);
  } else {
    console.log(i18n.getLocale('mode_pro_tips'));
  }
};
export default pro;
