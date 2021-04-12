import i18n from '../../../../lib/i18n';

const dev = ({ argv, pkgPath }) => {
  console.log(i18n.getLocale('mode_dev_tips'));
};
export default dev;
