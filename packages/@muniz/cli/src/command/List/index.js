import React, { useEffect, useState } from 'react';
import { Text, Box } from 'ink';
import { Table } from '@muniz/ink-ui';
import { lowdbAction } from '../../lib/lowdb.js';
import i18n from '../../lib/i18n';

/**
 * @muniz
 * @type react
 * @description help_list_desc
 */
const List = (props) => {
  const [pkgList, setPkgList] = useState([
    [
      i18n.getLocale('list_command_table_head1'),
      i18n.getLocale('list_command_table_head2'),
      i18n.getLocale('list_command_table_head3'),
    ],
  ]);

  useEffect(() => {
    const result = lowdbAction.getPluginPkgList();
    setPkgList((state) => state.concat(result));
  }, []);

  return (
    <Box flexDirection="column" marginTop="1">
      <Box marginBottom="1">
        <Text>{i18n.getLocale('list_command_title', { count: pkgList.length - 1 })}</Text>
      </Box>

      <Box flexDirection="column">
        {pkgList.length > 1 ? <Table data={pkgList} /> : <Text>{i18n.getLocale('list_command_empty_tips')}</Text>}
      </Box>
    </Box>
  );
};

export default List;
