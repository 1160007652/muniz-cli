import React from 'react';
import { Box, Text } from 'ink';

const NotCommand = (props) => {
  const { pkgName, argv, env } = props;

  /**
   * 可以在这里做 命令 推荐
   */

  const cliNotCommand = () => {
    return (
      <Box flexDirection="column" paddingTop={1}>
        <Text>
          该 <Text color="green">{argv.input[0]}</Text> 命令不在内置命令当中，属于插件命令。
        </Text>
        <Box marginTop="1" marginBottom="1">
          <Text>提示: 可以尝试执行以下命令进行修复</Text>
        </Box>

        <Text color="green">{`命令: muniz add ${pkgName}`}</Text>
      </Box>
    );
  };

  const pluginNotCommand = () => {
    return (
      <Box flexDirection="column" paddingTop={1}>
        <Text>
          该 <Text color="green">{argv.input[0]}</Text> 插件中不存在<Text color="green">{argv.input[1]}</Text>命令。
        </Text>
        <Box marginTop="1" marginBottom="1">
          <Text>提示: 可以尝试执行以下命令进行修复</Text>
        </Box>

        <Text color="green">{`命令: muniz add ${pkgName}`}</Text>
      </Box>
    );
  };

  return env.command === 'cli' ? cliNotCommand() : pluginNotCommand();
};

export default NotCommand;
