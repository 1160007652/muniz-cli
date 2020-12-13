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

async function replacePkgInfo({ anwser }) {
  const pkgInfo = require(path.join(anwser.destDir, './package.json'));
  pkgInfo.name = anwser.projectName;
  pkgInfo.description = anwser.projectDesc;
  fse.outputFileSync(path.join(anwser.destDir, './package.json'), JSON.stringify(pkgInfo, null, 2));
}

/**
 * 安装 项目依赖
 */
async function runCommand(command, args) {
  return await shellExec(command, args);
}

export default { replacePkgInfo, runCommand };
