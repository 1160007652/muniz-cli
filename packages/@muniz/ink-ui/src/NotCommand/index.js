import React, { Fragment } from 'react';
import { Box, Text } from 'ink';
import i18n from '../configs/i18n';

const NotCommand = (props) => {
  const { argv, type, recommand, locale = 'zhCN' } = props;
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

        {recommand ? (
          <Box marginBottom="1">
            <Text color="green">{i18n.getLocale('not_command_exec_command_1', { command: `muniz ${recommand}` })}</Text>
          </Box>
        ) : (
          <Fragment>
            <Text>{i18n.getLocale('not_command_doctor_tips')}</Text>
            <Text color="green">{`${i18n.getLocale('not_command_exec_command_2', {
              command: `muniz add ${argv.command[0]}`,
            })}`}</Text>
          </Fragment>
        )}
      </Box>
    );
  };

  const pluginNotCommand = () => {
    return (
      <Box flexDirection="column" paddingTop={1}>
        <Text>{i18n.getLocale('not_command_plugin_title', { plugin: argv.command[0], command: argv.command[1] })}</Text>

        {recommand && (
          <Fragment>
            <Box marginTop="1" marginBottom="1">
              <Text>{i18n.getLocale('not_command_tips')}</Text>
            </Box>
            <Box marginBottom="1">
              <Text color="green">
                {i18n.getLocale('not_command_exec_command_1', { command: `muniz ${argv.command[0]} ${recommand}` })}
              </Text>
            </Box>
          </Fragment>
        )}
      </Box>
    );
  };

  return type === 'cli' ? cliNotCommand() : pluginNotCommand();
};

export default NotCommand;
