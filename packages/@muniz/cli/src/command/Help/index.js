import React from 'react';
import { Box, Text } from 'ink';
// import { default as pluginI18n } from '@muniz/muniz-plugin-i18n';

import CommandTextList from '../Components/CommandTextList';

// const i18n = pluginI18n.i18n();

const Help = ({ data }) => {
  const { header, footer, usages = [], commands = [], options = [], otherOptions = [], examples = [] } = data;
  return (
    <Box flexDirection="column" paddingTop={1}>
      {header && <Text>{header}</Text>}

      {usages.length > 0 && <CommandTextList data={usages} label="Usage" labelColor="blue" />}

      {commands.length > 0 && <CommandTextList data={commands} label="Command" labelColor="blue" />}

      {options.length > 0 && <CommandTextList data={options} label="Options" labelColor="#FF8C00" />}

      {otherOptions.length > 0 && <CommandTextList data={otherOptions} label="Other Options" labelColor="#FF8C00" />}

      {examples.length > 0 && <CommandTextList data={examples} label="Examples" labelColor="yellow" />}

      {footer && <Box marginTop={1}>{/* <Text>{i18n.get(footer)}</Text> */}</Box>}
    </Box>
  );
};

export default Help;
