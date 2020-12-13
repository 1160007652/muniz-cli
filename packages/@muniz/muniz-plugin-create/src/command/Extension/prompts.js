import { prokectName, projectDesc, isGit, extensionShortName } from '../../lib/prompts';
import i18n from '../../configs/i18n';

const inquirer = require('inquirer');

export default async () => {
  const answers = await inquirer.prompt([prokectName, extensionShortName, projectDesc, isGit]);
  return answers;
};
