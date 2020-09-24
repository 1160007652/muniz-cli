import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Spacer } from 'ink';

const Version = ({ data }) => {
  const { version, author, name } = data;
  return (
    <Box flexDirection="column" paddingTop={1}>
      <Text>插件名称：{name}</Text>
      <Text>当前版本：{version}</Text>
      <Text>作者：{author}</Text>
    </Box>
  );
};

export default Version;
