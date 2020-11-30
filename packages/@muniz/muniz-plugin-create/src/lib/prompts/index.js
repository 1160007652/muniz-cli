import i18n from '../../configs/i18n';

const fse = require('fs-extra');
const path = require('path');

// 1、收集项目名称
export const prokectName = {
  type: 'input',
  message: i18n.getLocale('projectName'),
  name: 'prokectName',
  default: '',
  validate: (projectName) => {
    // 生成项目目录
    const destDir = path.resolve(process.cwd(), projectName || '.');

    // 判断项目是否有重名的文件夹
    const isProjectExist = fse.existsSync(destDir);

    if (isProjectExist) {
      return i18n.getLocale('create_project_have_existed');
    } else {
      return true;
    }
  },
};

// 2、收集项目描述
export const projectDesc = {
  type: 'input',
  message: i18n.getLocale('projectDesc'),
  name: 'projectDesc',
  default: '',
};

// 3、是否启动Git
export const isGit = {
  type: 'confirm',
  message: i18n.getLocale('isGit'),
  name: 'isGit',
  default: true,
};

// 4、chrome 扩展短名称
export const extensionShortName = {
  type: 'input',
  message: i18n.getLocale('extensionShortName'),
  name: 'extensionShortName',
  default: '',
};
