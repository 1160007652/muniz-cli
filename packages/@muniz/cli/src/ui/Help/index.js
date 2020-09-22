import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Spacer } from 'ink';

import CommandLabel from '../Components/CommandLabel';
import CommandTextList from '../Components/CommandTextList';

const Help = ({ data }) => {
  const { header, footer, usages = [], commands = [], options = [], otherOptions = [], examples = [] } = data;
  return (
    <Box flexDirection="column" paddingTop={1}>
      {header && <Text>{header}</Text>}

      {usages.length > 0 && <CommandLabel color="blue">Usage</CommandLabel>}

      {usages.length > 0 && <CommandTextList data={usages} />}

      {commands.length > 0 && <CommandLabel color="blue">Command</CommandLabel>}

      {commands.length > 0 && <CommandTextList data={commands} />}

      {options.length > 0 && <CommandLabel color="#FF8C00">Options</CommandLabel>}

      {options.length > 0 && <CommandTextList data={options} />}

      {otherOptions.length > 0 && <CommandLabel color="#FF8C00">Other Options</CommandLabel>}

      {otherOptions.length > 0 && <CommandTextList data={otherOptions} />}

      {examples.length > 0 && <CommandLabel color="yellow">Examples</CommandLabel>}

      {examples.length > 0 && (
        <CommandTextList data={[{ command: '$ create pc_test ', desc: '创建一个 pc_test 项目工程 ' }]} />
      )}

      {footer && (
        <Box marginTop={1}>
          <Text>{footer}</Text>
        </Box>
      )}
      <Spacer />
    </Box>
  );
};

export default Help;
