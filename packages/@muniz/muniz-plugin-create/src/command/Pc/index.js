const path = require('path');
const ora = require('ora');
import prompts from './prompts';
import project from '../../lib/project';
import pkgManger from '../../lib/pkgManger';
import i18n from '../../configs/i18n';

/**
 * @muniz
 * @type function
 * @description command_pc_desc
 * */
async function Pc(props) {
  let anwser = await prompts(props);
  anwser = {
    ...anwser,
    branch: anwser.isTypeScript ? 'typescript' : 'main',
    destDir: path.resolve(process.cwd(), anwser.projectName || '.'),
  };
  throw new Error('muniz-plugin-create 插件 错误');

  // 同步代码
  await project.syncRemoteProject({ type: 'pc', anwser });

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

  // 初始化Git
  await project.initGit(anwser);
}

export default Pc;
