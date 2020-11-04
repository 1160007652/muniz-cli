import { lowdb } from '../../../../lib/lowdb.js';
import i18n from '@muniz/cli-i18n';

const dev = ({ argv, pkgPath }) => {
  if (argv.options?.type === 'plugin') {
    lowdb.set('MUNIZ_PLUGIN_DEV', true).write();
    console.log(`\n ${i18n.getLocale('mode_dev_plugin_tips')}`);
  } else {
    console.log(i18n.getLocale('mode_dev_tips'));
  }
};
export default dev;
