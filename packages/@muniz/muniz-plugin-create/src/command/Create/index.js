import PropTypes from 'prop-types';

import prompts from './lib/prompts';

/**
 * @muniz
 * @type function
 * @description 创建指令
 * */
const Create = async (props) => {
  const originPath = '/Users/mac/NodeProjects/muniz-tpl/muniz-tpl-pc'; // 源工程模版
  console.log(props);
  // 获取前置预设
  const answers = await prompts();
  console.log(answers);
};

Create.propTypes = {
  /**
   * @muniz
   * @description falgs哈哈
   */
  flags: PropTypes.string,
  /**
   * @muniz
   * @description Number类型转换
   */
  count: PropTypes.number,
  /**
   * @muniz
   * @description 生成项目的名称
   * @alias n
   */
  isGit: PropTypes.bool,
};

Create.defaultProps = {
  flags: 'wowowoowqqqqqqq',
  isGit: false,
  count: 1,
};

export default Create;
