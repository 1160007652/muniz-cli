const inquirer = require('inquirer');
import { lowdbAction } from '../../lib/lowdb.js';
import i18n from '../../lib/i18n';

/**
 * @muniz
 * @type function
 * @description help_locale_desc
 */
const Locale = async (props) => {
  // 非react 交互
  const promptList = [
    {
      type: 'list',
      message: i18n.getLocale('command_locale_tips', { count: 2 }),
      name: 'language',
      default: i18n.currentLocale,
      choices: [
        {
          value: 'zhCN',
          name: i18n.getLocale('zh_cn'),
        },
        {
          value: 'enUS',
          name: i18n.getLocale('en_us'),
        },
      ],
    },
  ];

  const answers = await inquirer.prompt(promptList);

  lowdbAction.setLanguageLocale({ language: answers.language });
};

export default Locale;
