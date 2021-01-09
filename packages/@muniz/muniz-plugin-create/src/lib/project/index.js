/**
 * 项目处理库，负责处理如下事情：
 * 1、通过 Git 拉取项目
 * 2、通过 本地 绝对 路径 拉取项目
 */

const GitDownLoad = require('download-git-repo');
const ora = require('ora');
import pkgManger from '../pkgManger';
import i18n from '../../configs/i18n';
import gitRepo from '../../configs/gitRepo';

/**
 *
 * 同步远程项目资源
 *
 * @param {obj}
 * @param {string} obj.type 项目类型, 如 pc、H5、extensions、plugin
 * @param {string} obj.projectPath 项目仓库路径
 */
async function syncRemoteProject({ type, anwser }) {
  const gitRepoUrl = gitRepo[type][anwser.branch];
  let spinner = ora(i18n.getLocale('template_project_down'));
  spinner.start();
  try {
    await downTplLoad(gitRepoUrl, anwser.destDir);
    spinner.succeed(i18n.getLocale('template_project_down_success'));
  } catch (error) {
    spinner.fail(i18n.getLocale('template_project_down_fail'));
    throw err;
  }
}

function downTplLoad(gitRepoUrl, destDir) {
  return new Promise((resolve, reject) => {
    GitDownLoad(gitRepoUrl, destDir, { clone: false }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(destDir);
      }
    });
  });
}

/**
 * 初始化Git
 * @param {obj} anwser
 */
async function initGit(anwser) {
  if (anwser.isGit) {
    try {
      await pkgManger.runCommand('git init', { cwd: anwser.destDir });
      await pkgManger.runCommand('git add .', { cwd: anwser.destDir });
      await pkgManger.runCommand(`git commit -m "${i18n.getLocale('git_commit_content')}"`, { cwd: anwser.destDir });
      await pkgManger.runCommand('git branch -M main', { cwd: anwser.destDir });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

export default { syncRemoteProject, initGit };
