import React from 'react';
import { Box, Text, Newline } from 'ink';

import CommandTextList from '../Components/CommandTextList';

const Help = ({ data, show }) => {
  const { usage, commands, otherOptions, footer } = data;

  return (
    <Box flexDirection="column" paddingTop={1}>
      {show === 'options' && (
        <Box marginLeft={2} flexDirection="column">
          <Text>{commands.description}</Text>
        </Box>
      )}

      <CommandTextList data={[usage]} label="Usage" labelColor="blue" />

      {show === 'command' && commands.length > 0 && (
        <CommandTextList data={commands} label="Command" labelColor="blue" />
      )}

      {show === 'options' && commands?.options?.length > 0 && (
        <CommandTextList data={commands.options} label="Options" labelColor="#FF8C00" />
      )}

      <CommandTextList data={otherOptions} label="Other Options" labelColor="#FF8C00" />
      <Box marginBottom={1} />
    </Box>
  );
};

export default Help;
