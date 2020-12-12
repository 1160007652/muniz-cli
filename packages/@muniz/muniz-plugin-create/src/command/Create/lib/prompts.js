// 导出创建模版需要的数据
const inquirer = require('inquirer');

async function prompts() {
  const promptList = [
    {
      type: 'input',
      message: '输入项目名称',
      name: 'projectName',
      default: '',
    },
    {
      type: 'input',
      message: '输入项目描述',
      name: 'projectDesc',
      default: '',
    },
    {
      type: 'confirm',
      message: '是否初始化Git',
      name: 'isGit',
      default: true,
    },
    {
      type: 'list',
      message: '选择模版',
      name: 'template',
      default: 'PC',
      choices: [
        { value: 'H5', name: 'H5' },
        { value: 'PC', name: 'PC' },
        { value: 'chrome-ext', name: 'chrome-ext' },
        { value: 'plugin-tpl', name: 'plugin-tpl' },
      ],
    },
  ];

  const answers = await inquirer.prompt(promptList);
  return answers;
}

export default prompts;
