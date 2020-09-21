import React from 'react';
import { Box, Text } from 'ink';
import CommandText from '../CommandText';

const CommandTextList = ({ data }) => {
  return (
    <Box marginLeft={2} flexDirection="column">
      {data.map((item, index) => {
        return <CommandText key={index} data={item} />;
      })}
    </Box>
  );
};

export default CommandTextList;
