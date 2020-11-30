import { prokectName, projectDesc, isGit } from '../../lib/prompts';
import i18n from '../../configs/i18n';

const fse = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

export default async () => {
  const answers = await inquirer.prompt([
    {
      ...prokectName,
      validate: (projectName) => {
        // 生成项目目录
        const destDir = path.resolve(process.cwd(), `muniz-plugin-${projectName}` || '.');

        // 判断项目是否有重名的文件夹
        const isProjectExist = fse.existsSync(destDir);

        if (isProjectExist) {
          return i18n.getLocale('create_project_have_existed');
        } else {
          return true;
        }
      },
    },
    projectDesc,
    isGit,
  ]);
  return answers;
};
