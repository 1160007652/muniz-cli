const path = require('path');
const ora = require('ora');
import prompts from './prompts';
import project from '../../lib/project';
import pkgManger from '../../lib/pkgManger';
import i18n from '../../configs/i18n';

/**
 * @muniz
 * @type function
 * @description command_plugin_desc
 * */
async function Plugin(props) {
  let anwser = await prompts(props);
  anwser = {
    ...anwser,
    branch: 'main', // anwser.isTypeScript ? 'typescript' :
    destDir: path.resolve(process.cwd(), `muniz-plugin-${anwser.projectName}` || '.'),
  };

  // 同步代码
  await project.syncRemoteProject({ type: 'plugin', anwser });

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

export default Plugin;
