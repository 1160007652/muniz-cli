import { prokectName, projectDesc, isTypeScript, isGit, extensionShortName, extensionAuthor } from '../../lib/prompts';

const inquirer = require('inquirer');

export default async () => {
  const answers = await inquirer.prompt([
    prokectName,
    extensionShortName,
    projectDesc,
    extensionAuthor,
    isTypeScript,
    isGit,
  ]);
  return answers;
};
