import React from 'react';
import { Box, Text } from 'ink';
import { i18n } from '@muniz/muniz-plugin-i18n';

const NotCommand = (props) => {
  const { packageName, command, isInternalCommand } = props;

  return isInternalCommand ? (
    <Box flexDirection="column" paddingTop={1}>
      <Text dimColor>
        该 <Text color="blue">{command}</Text> 命令不在内置命令当中，属于插件命令。
      </Text>
      <Text>{i18n.get('你好')}</Text>
      <Box marginTop="1" marginBottom="1">
        <Text>提示: 可以尝试执行以下命令进行修复</Text>
      </Box>

      <Text color="green">{`命令: muniz add ${packageName}`}</Text>
    </Box>
  ) : (
    <Box>
      <Text>命令不存在</Text>
    </Box>
  );
};

export default NotCommand;
