const inquirer = require('inquirer');

import { prokectName, projectDesc, isTypeScript, isGit } from '../../lib/prompts';

export default async () => {
  const answers = await inquirer.prompt([prokectName, projectDesc, isTypeScript, isGit]);
  return answers;
};
