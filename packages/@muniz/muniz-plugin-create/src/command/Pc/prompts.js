const inquirer = require('inquirer');

import { prokectName, projectDesc, isGit } from '../../lib/prompts';
import i18n from '../../configs/i18n';

export default async () => {
  const answers = await inquirer.prompt([prokectName, projectDesc, isGit]);
  return answers;
};
