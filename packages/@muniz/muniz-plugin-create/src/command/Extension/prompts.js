import { prokectName, projectDesc, isGit, extensionShortName, extensionAuthor } from '../../lib/prompts';

const inquirer = require('inquirer');

export default async () => {
  const answers = await inquirer.prompt([prokectName, extensionShortName, projectDesc, extensionAuthor, isGit]);
  return answers;
};
