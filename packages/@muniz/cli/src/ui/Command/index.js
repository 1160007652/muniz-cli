import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Spacer } from 'ink';

const Command = ({ name }) => {
  return (
    <Box flexDirection="column" paddingTop={1}>
      <Text>muniz脚手架, 基于插件机制开发, 自成一套体系</Text>

      {/* Usage */}
      <Box paddingTop={1} paddingBottom={1}>
        <Text bold color="blue">
          Usage
        </Text>
      </Box>

      <Box marginLeft={2} flexDirection="column">
        <Text>{`$ muniz <command> [options]`}</Text>
      </Box>

      {/* command */}
      <Box paddingTop={1} paddingBottom={1}>
        <Text bold color="blue">
          [Command]
        </Text>
      </Box>

      <Box marginLeft={2} flexDirection="column">
        <Text>
          <Text>{`$ create <name> `}</Text>
          <Text dimColor>创建项目工程</Text>
        </Text>
        <Text>
          <Text>{`$ add    <name> `}</Text>
          <Text dimColor>添加插件</Text>
        </Text>
      </Box>

      {/* options */}
      <Box paddingTop={1} paddingBottom={1}>
        <Text bold color="green">
          Options
        </Text>
      </Box>

      <Box marginLeft={2} flexDirection="column">
        <Text>
          <Text>{`--name `}</Text>
          <Text dimColor>属性</Text>
        </Text>
      </Box>

      {/* other options */}
      <Box paddingTop={1} paddingBottom={1}>
        <Text bold color="green">
          Other Options
        </Text>
      </Box>

      <Box marginLeft={2} flexDirection="column">
        <Text>
          <Text>{`-h, --help `}</Text>
          <Text dimColor>显示帮助文档</Text>
        </Text>
        <Text>
          <Text>{`-v, --version `}</Text>
          <Text dimColor>显示版本号</Text>
        </Text>
      </Box>

      {/* examples */}
      <Box paddingTop={1} paddingBottom={1}>
        <Text bold color="yellow">
          Examples
        </Text>
      </Box>

      <Box marginLeft={2} flexDirection="column">
        <Text>
          <Text>{`$ create pc_test `}</Text>
          <Text dimColor>创建一个 pc_test 项目工程</Text>
        </Text>
      </Box>
    </Box>
  );
};

export default Command;
