import { lowdb } from '../../../../lib/lowdb.js';

const dev = ({ argv, pkgPath }) => {
  if (argv.options?.type === 'plugin') {
    console.log('开启脚手架插件开发者模式');
    lowdb.set('MUNIZ_PLUGIN_DEV', true).write();
    console.log(lowdb.get('MUNIZ_CLI_DEBUG').value());
    console.log(lowdb.get('plugins').value());
  } else {
    console.log(lowdb.get('MUNIZ_PLUGIN_DEV').value());
    console.log('主muniz控制器 开发者模式');
  }
};
export default dev;
