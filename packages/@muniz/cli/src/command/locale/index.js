import React from 'react';
import { Box, Text, useApp } from 'ink';
import PropTypes from 'prop-types';
import { Select } from '@muniz/ink-ui';
import { lowdbAction } from '../../lib/lowdb.js';

/**
 * @muniz
 * @type react
 * @description 切换多语言
 */
const Locale = (props) => {
  const { exit } = useApp();

  /**
   * 多语言选中事件
   */
  const handleOnBlur = (language) => {
    lowdbAction.setLanguageLocale({ language });
    setTimeout(() => {
      exit();
    }, 100);
  };
  return (
    <Box flexDirection="column" marginBottom="1">
      <Box marginTop="1" flexDirection="column">
        <Text color="green">目前支持 2 种多语言：</Text>

        <Box flexDirection="column" marginTop="1" marginBottom="1">
          <Select
            onBlur={() => {
              handleOnBlur('zhCN');
            }}
          >
            <Text>中文</Text>
          </Select>
          <Select
            onBlur={() => {
              handleOnBlur('enUS');
            }}
          >
            <Text>英文</Text>
          </Select>
        </Box>
        <Text color="yellow">操作：按下 tab 键 切换，Enter 键 执行</Text>
      </Box>
    </Box>
  );
};

export default Locale;
