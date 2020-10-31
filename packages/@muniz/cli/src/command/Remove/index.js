import React from 'react';
import { Box, Text } from 'ink';
import { lowdbAction } from '../../lib/lowdb.js';

/**
 * @muniz
 * @description 删除插件
 */
const Remove = () => {
  // lowdbAction.removePluginPkg();
  return (
    <Box>
      <Text>删除插件命令</Text>
    </Box>
  );
};

export default Remove;
