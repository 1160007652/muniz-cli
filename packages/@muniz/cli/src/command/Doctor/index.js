import i18n from '../../lib/i18n';
const execa = require('execa');

/**
 * @muniz
 * @type function
 * @description help_doctor_desc
 */
const Doctor = async ({ input }) => {
  const node_modules_root_path = await execa.command('npm root -g', { shell: true });
  console.log(i18n.getLocale('doctor_title_1'));
  console.log(i18n.getLocale('doctor_title_1_info_1'));
  console.log(`NODE_PATH=${node_modules_root_path.stdout}`);
};

export default Doctor;
