import { InkUI, React } from '@muniz/common';
const { Version } = InkUI;

/**
 * 显示帮助命令
 */
const versionCommand = (ctx, next) => {
  const { pkg, argv, render } = ctx;
  if (argv.options?.version) {
    render(<Version pkg={pkg} />);
    process.exit();
  } else {
    next();
  }
};

export default versionCommand;
