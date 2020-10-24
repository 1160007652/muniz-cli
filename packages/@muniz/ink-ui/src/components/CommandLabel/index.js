import React from 'react';
import { Box, Text, Spacer } from 'ink';

const CommandLabel = ({ color, children }) => {
  return (
    <Box paddingTop={1} paddingBottom={1}>
      <Text bold color={color}>
        {children}
      </Text>
    </Box>
  );
};

export default CommandLabel;
