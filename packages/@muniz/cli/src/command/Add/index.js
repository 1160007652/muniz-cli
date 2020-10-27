import React from 'react';
import { Text } from 'ink';
import PropTypes from 'prop-types';

/**
 * @muniz
 * @description 添加插件
 */
const Add = (props) => {
  return <Text>添加插件命令</Text>;
};

Add.propTypes = {
  /**
   * @muniz
   * @description falgs哈哈
   */
  mode: PropTypes.string,
  /**
   * @muniz
   * @description 生成项目的名称
   * @alias n
   */
  isGit: PropTypes.bool,
};

Add.defaultProps = {
  mode: 'dev',
  isGit: false,
};
export default Add;
