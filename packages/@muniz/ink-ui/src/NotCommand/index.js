import React from 'react';
import { Box, Text } from 'ink';
import i18n from '../configs/i18n';

const NotCommand = (props) => {
  const { argv, env, isExistPlugin = false, locale = 'zhCN' } = props;
  i18n.setLocale({ locale });

  /**
   * 可以在这里做 命令 推荐
   */

  const cliNotCommand = () => {
    return (
      <Box flexDirection="column" paddingTop={1}>
        <Text>{i18n.getLocale('not_command_cli_title', { command: argv.command[0] })}</Text>
        <Box marginTop="1" marginBottom="1">
          <Text>{i18n.getLocale('not_command_tips')}</Text>
        </Box>
        <Box marginBottom="1">
          <Text color="green">{i18n.getLocale('not_command_doctor_tips')}</Text>
        </Box>

        <Text color="green">{`${i18n.getLocale('not_command_name')}: muniz add xxx`}</Text>
      </Box>
    );
  };

  const pluginNotCommand = () => {
    return (
      <Box flexDirection="column" paddingTop={1}>
        <Text>
          {isExistPlugin ? (
            <Text>
              {i18n.getLocale('not_command_plugin_sub_title', {
                plugin: argv.command[0],
                command: argv.command[1],
              })}
            </Text>
          ) : (
            <Text>
              {i18n.getLocale('not_command_plugin_title', {
                plugin: argv.command[0],
              })}
            </Text>
          )}
        </Text>
        <Box marginTop="1" marginBottom="1">
          <Text>{i18n.getLocale('not_command_tips')}</Text>
        </Box>
        <Box marginBottom="1">
          <Text color="green">{i18n.getLocale('not_command_doctor_tips')}</Text>
        </Box>

        <Text color="green">{`${i18n.getLocale('not_command_name')}: muniz add xxx`}</Text>
      </Box>
    );
  };

  return env.command === 'cli' ? cliNotCommand() : pluginNotCommand();
};

export default NotCommand;
