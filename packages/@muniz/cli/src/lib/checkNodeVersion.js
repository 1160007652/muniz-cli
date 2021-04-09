const semver = require('semver');
const pkgInfo = require('../../package.json');
const requiredVersion = pkgInfo.engines.node;
import i18n from './i18n';

/**
 *
 * @param {String} wanted 设定的最小兼容版本号
 * @param {String} id npm包名称
 * @description 强制检查 脚手架版本依赖是否大于给定的值
 * @returns 条件成立继续执行,否则退出
 *
 */
function checkNodeVersion(id) {
  if (!semver.satisfies(process.version, requiredVersion)) {
    console.log(i18n.getLocale('check_node_version_tips', { version: process.version, id, wanted: requiredVersion }));
    process.exit(1);
  }
}

module.exports = (name) => {
  checkNodeVersion(name);
};
