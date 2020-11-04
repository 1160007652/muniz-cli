import React from 'react';
import { Box, Text } from 'ink';
import languages from '../configs/locales';
import i18n from '@muniz/cli-i18n';

const Version = ({ pkg, locale = 'zhCN' }) => {
  const { version, homepage, name } = pkg;
  i18n.setLocale({ locale });
  i18n.setlanguages({ languages });
  return (
    <Box flexDirection="column" paddingTop={1}>
      <Text>{`${i18n.getLocale('version_plugin_name')}: ${name}`}</Text>
      <Text>{`${i18n.getLocale('version_current')}: ${version}`}</Text>
      <Text>Git：{homepage}</Text>
    </Box>
  );
};

export default Version;
