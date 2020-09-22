import React from 'react';
import { Box, Text } from 'ink';

const CommandText = ({ data }) => {
  return (
    <Box marginLeft={2} flexDirection="column">
      <Text>
        <Text>{data.command}&nbsp;&nbsp;</Text>
        {data?.default && <Text color="#0dbb79">{` Default: ${data.default} `}&nbsp;&nbsp;</Text>}
        <Text dimColor>{data.desc}</Text>
      </Text>
    </Box>
  );
};

export default CommandText;
