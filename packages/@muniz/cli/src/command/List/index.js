import React, { useEffect, useState } from 'react';
import { Text, Box } from 'ink';
import { Table } from '@muniz/ink-ui';
import { lowdbAction } from '../../lib/lowdb.js';

/**
 * @muniz
 * @type react
 * @description 插件列表
 */
const List = (props) => {
  const [pkgList, setPkgList] = useState([['序号', '命令', '插件名称']]);

  useEffect(() => {
    const result = lowdbAction.getPluginPkgList();
    setPkgList((state) => state.concat(result));
  }, []);

  return (
    <Box flexDirection="column" marginTop="1">
      <Box marginBottom="1">
        <Text>
          Muniz 脚手架，已安装<Text color="green"> {pkgList.length - 1} </Text>个插件
        </Text>
      </Box>

      <Box flexDirection="column">
        {pkgList.length > 1 ? (
          <Table data={pkgList} />
        ) : (
          <Text>还未安装插件扩展，请执行 muniz add 命令，添加需要的插件</Text>
        )}
      </Box>
    </Box>
  );
};

export default List;
