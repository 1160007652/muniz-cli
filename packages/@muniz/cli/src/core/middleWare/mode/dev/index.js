import { lowdb } from '../../../../lib/lowdb.js';

const dev = ({ argv, pkgPath }) => {
  if (argv.options?.type === 'plugin') {
    lowdb.set('MUNIZ_PLUGIN_DEV', true).write();
    console.log('\n「 脚手架插件 」开发者模式 - 开启成功');
  } else {
    console.log('主muniz控制器 开发者模式');
  }
};
export default dev;
