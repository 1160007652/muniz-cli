import React from 'react';
import { Box, Text } from 'ink';

const CommandText = ({ data }) => {
  return (
    <Box marginLeft={2} flexDirection="column">
      <Text>
        <Text>{data.command}</Text>
        <Text dimColor>{data.desc}</Text>
      </Text>
    </Box>
  );
};

export default CommandText;
