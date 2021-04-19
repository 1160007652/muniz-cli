import fetch from 'node-fetch';
const semver = require('semver');

/**
 * 升级插件
 *
 * @param {object} pkgInfo package包信息
 * @returns {object} { isUpdater, PkgData }
 */
async function updatePackage({ pkgInfo }) {
  const response = await fetch(`https://registry.npmjs.org/${pkgInfo.name}/latest`);
  const PkgData = await response.json();
  const isUpdater = semver.gt(PkgData.version, pkgInfo.version);
  return { isUpdater, PkgData };
}

export default updatePackage;
