import React from 'react';
import { Box, Text } from 'ink';

const Version = ({ pkg }) => {
  const { version, homepage, name } = pkg;
  return (
    <Box flexDirection="column" paddingTop={1}>
      <Text>插件名称：{name}</Text>
      <Text>当前版本：{version}</Text>
      <Text>Git：{homepage}</Text>
    </Box>
  );
};

export default Version;
