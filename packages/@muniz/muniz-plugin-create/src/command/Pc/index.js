import PropTypes from 'prop-types';
const path = require('path');
const ora = require('ora');
import prompts from './prompts';
import syncRemoteProject from '../../lib/project';
import pkgManger from '../../lib/pkgManger';
import i18n from '../../configs/i18n';

/**
 * @muniz
 * @type function
 * @description 创建PC端开发模版
 * */
async function Pc(props) {
  let anwser = await prompts();
  anwser = {
    ...anwser,
    branch: anwser.isTypeScript ? 'typescript' : 'main',
    destDir: path.resolve(process.cwd(), anwser.projectName || '.'),
  };

  // anwser = {
  //   projectName: 'test',
  //   projectDesc: 'miaoshu',
  //   isTypeScript: true,
  //   isGit: true,
  //   branch: 'typescript',
  //   destDir: '/Users/mac/NodeProjects/testProject/test',
  // };

  // 同步代码
  await syncRemoteProject({ type: 'pc', projectPath: '/', anwser });

  // 替换信息
  await pkgManger.replacePkgInfo({ anwser });

  // 安装依赖
  const spinner = ora(i18n.getLocale('project_install_npm'));
  spinner.start();
  try {
    await pkgManger.runCommand('npm install', { cwd: anwser.destDir });
    spinner.succeed(i18n.getLocale('project_install_npm_success'));
  } catch (err) {
    spinner.fail(i18n.getLocale('project_install_npm_fail'));
    throw err;
  }

  // 打印结果
}

Pc.propTypes = {
  /**
   * @muniz
   * @description 生成项目的名称
   * @alias n
   */
  isGit: PropTypes.bool,
};

Pc.defaultProps = {
  isGit: false,
};

export default Pc;
