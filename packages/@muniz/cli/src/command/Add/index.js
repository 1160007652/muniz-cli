import React, { useState } from 'react';
import { Text } from 'ink';
import PropTypes from 'prop-types';

/**
 * @muniz
 * @description 添加插件
 */
const Add = (props) => {
  const [count, setCount] = useState(1);
  return <Text>添加插件命令-{count}</Text>;
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
