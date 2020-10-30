import React, { useState, useEffect } from 'react';
import { Box, Text } from 'ink';
import PropTypes from 'prop-types';
const execa = require('execa');

/**
 * @muniz
 * @description 添加插件
 */
const Add = (props) => {
  const [pkgList, setPkgList] = useState([]);
  const [error, setError] = useState('');
  const { input } = props;

  useEffect(() => {
    input.forEach((item) => {
      // 提取短名称 @muniz/muniz-plugin-create => create
      let shortName = String(item).match(/.*?muniz-plugin-(.*?)$/);
      shortName = shortName?.length > 1 ? shortName[1] : '';

      if (!shortName) {
        setError(`${item} : 不是「 Muniz 」 脚手架插件`);
      } else {
        setPkgList((state) => [...state, { shortName, pkgName: item }]);
      }
    });
  }, []);

  // execa.commandSync(`npm uninstall -g ${input.join(' ')} `);
  return (
    <Box>
      <Box>{input.length < 0 && <Text>请输入要安装的插件包名称</Text>}</Box>
      {error ? (
        <Text>{error}</Text>
      ) : (
        <Box flexDirection="column">
          <Text>正在安装如下包</Text>
          {pkgList.length > 0 &&
            pkgList.map((item, index) => {
              return <Text key={index}>{item.pkgName}</Text>;
            })}
        </Box>
      )}
    </Box>
  );
};

Add.propTypes = {
  /**
   * @muniz
   * @description falgs哈哈
   */
  mode: PropTypes.string,
  /**
   * @muniz
   * @description 生成项目的名称
   * @alias n
   */
  isGit: PropTypes.bool,
};

Add.defaultProps = {
  mode: 'dev',
  isGit: false,
};
export default Add;
