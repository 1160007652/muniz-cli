import React from 'react';
import { UpdateTips } from '@muniz/ink-ui';

import updatePackage from '../../../lib/updatePackage';

/**
 * 使用帮助命令
 */
const updatePkg = async (ctx, next) => {
  const { argv, render, pkg } = ctx;
  const { munizConfig } = pkg;

  // 开启自动更新, 在触发更新检查
  if (munizConfig?.plugin?.autoUpgrade || munizConfig?.cli?.autoUpgrade) {
    const { isUpdater, PkgData } = await updatePackage({ pkgInfo: pkg });
    // 检查到更新
    if (isUpdater) {
      render(
        <UpdateTips versionTips={`${pkg.version} -> ${PkgData.version}`} updateCommand={`muniz add ${pkg.name}`} />,
      );
      process.exit();
    } else {
      await next();
    }
  } else {
    await next();
  }
};

export default updatePkg;
