import React from 'react';
import { Box, Text } from 'ink';

const Version = ({ pkg }) => {
  const { version, author, name } = pkg;
  return (
    <Box flexDirection="column" paddingTop={1}>
      <Text>插件名称：{name}</Text>
      <Text>当前版本：{version}</Text>
      <Text>作者：{author}</Text>
    </Box>
  );
};

export default Version;
