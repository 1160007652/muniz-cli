import React from 'react';
import { Box, Text } from 'ink';

const CommandText = ({ data, commandWidth, defaultWidth, typeWidth, label }) => {
  return (
    <Box marginLeft={2} flexDirection="row">
      {['help_options', 'help_other_options'].includes(label) ? (
        <Box>
          <Box width={commandWidth}>
            <Text>{`--${data.key}`}</Text>
            <Text>{data?.alias && `, -${data.alias}`}</Text>
          </Box>
          <Box width={defaultWidth}>
            {![undefined, ''].includes(data?.default) && <Text color="#0dbb79">{` Default: ${data.default} `}</Text>}
          </Box>
          {data?.type ? (
            <Box width={typeWidth}>
              <Text>{` Type: ${data.type} `}</Text>
            </Box>
          ) : (
            <Text></Text>
          )}
        </Box>
      ) : (
        <Box width={commandWidth}>
          <Text>{data.key}</Text>
        </Box>
      )}
      <Text dimColor>{data.description}</Text>
    </Box>
  );
};

export default CommandText;
