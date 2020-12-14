/**
 * 包管理器， 负责执行如下事情
 * 1、安装依赖
 * 2、替换项目名称
 * 3、替换项目描述
 * 4、替换项目版本号
 */
const path = require('path');
const fse = require('fs-extra');
const shellExec = require('shell-exec');

/**
 * 替换Package.json 中的信息
 * @param {obj} anwser, prompts 结果集
 */
async function replacePkgInfo({ anwser }) {
  const pkgInfo = require(path.join(anwser.destDir, './package.json'));
  pkgInfo.name = anwser.projectName;
  pkgInfo.description = anwser.projectDesc;
  fse.outputFileSync(path.join(anwser.destDir, './package.json'), JSON.stringify(pkgInfo, null, 2));
}

/**
 * 替换Chrome扩展 manifest.json 中的信息
 * @param {obj} anwser, prompts 结果集
 */
async function replaceManifestInfo({ anwser }) {
  const manifest = require(path.join(anwser.destDir, './build/manifest/manifest.base.json'));
  manifest.author = anwser.extensionAuthor;
  manifest.description = anwser.projectDesc;
  manifest.name = anwser.projectName;
  manifest.short_name = anwser.extensionShortName;
  fse.outputFileSync(
    path.join(anwser.destDir, './build/manifest/manifest.base.json'),
    JSON.stringify(manifest, null, 2),
  );
}

/**
 * 安装 项目依赖
 * @param {string} command 命令
 * @param {obj} args 参数
 *
 */
async function runCommand(command, args) {
  return await shellExec(command, args);
}

export default { replacePkgInfo, replaceManifestInfo, runCommand };
