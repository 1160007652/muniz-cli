import React from 'react';
import { Box, Text, Newline } from 'ink';
import i18n from '@muniz/cli-i18n';
import CommandTextList from '../Components/CommandTextList';
import languages from '../configs/locales';

const Help = ({ data, show, locale = 'zhCN' }) => {
  const { usage, commands, otherOptions, footer } = data;
  i18n.setLocale({ locale });
  i18n.setlanguages({ languages });

  return (
    <Box flexDirection="column" paddingTop={1}>
      {show === 'options' && (
        <Box marginLeft={2} flexDirection="column">
          <Text>{commands.description}</Text>
        </Box>
      )}

      <CommandTextList data={[usage]} label="help_usage" labelColor="blue" />

      {show === 'command' && commands.length > 0 && (
        <CommandTextList data={commands} label="help_command" labelColor="blue" />
      )}

      {show === 'options' && commands?.options?.length > 0 && (
        <CommandTextList data={commands.options} label="help_options" labelColor="#73C991" />
      )}

      <CommandTextList data={otherOptions} label="help_other_options" labelColor="#73C991" />
      <Box marginBottom={1} />
    </Box>
  );
};

export default Help;
