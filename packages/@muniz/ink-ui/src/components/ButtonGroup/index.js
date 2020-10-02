import React from 'react';
import { Box, Text } from 'ink';

const ButtonGroup = ({ children, ...props }) => {
  return (
    <Box flexDirection="column" {...props}>
      <Box>
        <Text color="yellow">操作：按下 ◄ ► 键 切换，Enter 键 执行</Text>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};

export default ButtonGroup;
