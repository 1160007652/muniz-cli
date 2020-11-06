import React from 'react';
import PropTypes from 'prop-types';
import { Text, Box } from 'ink';
import i18n from '../../configs/i18n';

/**
 * @muniz
 * @type react
 * @description 更新模版命令
 */
const Update = () => {
  return (
    <Box flexDirection="column" padding={1}>
      <Text>{i18n.getLocale('command_update_title')}</Text>
    </Box>
  );
};

Update.propTypes = {
  /**
   * @muniz
   * @description 描述组件
   * @alias i
   */
  inputa: PropTypes.string.isRequired,
  /**
   * @muniz
   * @positionsArgs 1
   */
  flags: PropTypes.string,
  /**
   * @muniz
   * @description 生成项目的名称
   * @alias n
   */
  isGit: PropTypes.bool,
};

Update.defaultProps = {
  inputa: 'ssss',
  flags: 'wowowoowqqqqqqq',
  isGit: false,
};

export default Update;
