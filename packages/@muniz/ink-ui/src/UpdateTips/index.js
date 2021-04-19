import React from 'react';
import { Box, Text } from 'ink';
import i18n from '../configs/i18n';

const UpdateTips = ({ versionTips, updateCommand, locale = 'zhCN' }) => {
  i18n.setLocale({ locale });
  return (
    <Box flexDirection="column" paddingTop={1}>
      <Text>{`${i18n.getLocale('update_available')}: ${versionTips}`}</Text>
      <Text>{`${i18n.getLocale('update_run_label')}: ${updateCommand}`}</Text>
    </Box>
  );
};

export default UpdateTips;
