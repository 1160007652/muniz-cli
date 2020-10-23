import React from 'react';
import { Box, Text } from 'ink';
// import { default as pluginI18n } from '@muniz/muniz-plugin-i18n';

import CommandTextList from '../Components/CommandTextList';

// const i18n = pluginI18n.i18n();

const Help = ({ data, usage, show }) => {
  const usages = [{ key: usage, description: '' }];
  const otherOptions = [
    {
      key: 'help',
      alias: 'h',
      description: '显示帮助文档',
    },
    {
      key: 'version',
      alias: 'v',
      description: '显示版本号',
    },
  ];
  return (
    <Box flexDirection="column" paddingTop={1}>
      {show === 'options' && (
        <Box marginLeft={2} flexDirection="column">
          <Text>{data.description}</Text>
        </Box>
      )}

      <CommandTextList data={usages} label="Usage" labelColor="blue" />

      {show === 'command' && data.length > 0 && <CommandTextList data={data} label="Command" labelColor="blue" />}

      {show === 'options' && data?.options?.length > 0 && (
        <CommandTextList data={data.options} label="Options" labelColor="#FF8C00" />
      )}

      {<CommandTextList data={otherOptions} label="Other Options" labelColor="#FF8C00" />}
      <Box marginBottom={1} />
      {/* {examples.length > 0 && <CommandTextList data={examples} label="Examples" labelColor="yellow" />} */}
    </Box>
  );
};

export default Help;
