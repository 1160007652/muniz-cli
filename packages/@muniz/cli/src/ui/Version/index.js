import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Spacer } from 'ink';

const Version = ({ data }) => {
  return (
    <Box flexDirection="column" paddingTop={1}>
      <Text>当前版本：0.0.0</Text>
    </Box>
  );
};

export default Version;
