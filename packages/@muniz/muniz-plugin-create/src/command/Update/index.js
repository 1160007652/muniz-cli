import React from 'react';
import PropTypes from 'prop-types';
import { Text, Box, useFocus } from 'ink';

const Item = ({ label }) => {
  const { isFocused } = useFocus();
  return (
    <Text>
      {label} {isFocused && <Text color="green">(focused)</Text>}
    </Text>
  );
};

/**
 * @muniz
 * @description 更新模版命令
 */
const Update = () => {
  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text>Press Tab to focus next element, Shift+Tab to focus previous element, Esc to reset focus.</Text>
      </Box>
      <Item label="First" />
      <Item label="Second" />
      <Item label="Third" />
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
