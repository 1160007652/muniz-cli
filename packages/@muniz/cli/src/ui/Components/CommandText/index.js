import React from 'react';
import { Box, Text } from 'ink';

const CommandText = ({ data, width }) => {
  return (
    <Box marginLeft={2} flexDirection="row">
      <Box width={width}>
        <Text>{data.command}&nbsp;&nbsp;</Text>
        {![undefined, ''].includes(data?.default) && (
          <Text color="#0dbb79">{` Default: ${data.default} `}&nbsp;&nbsp;</Text>
        )}
      </Box>
      <Text dimColor>{data.desc}</Text>
    </Box>
  );
};

export default CommandText;
