import React, { useState, useEffect } from 'react';
import { Box, Text, useInput, useFocus, useFocusManager, useStdin } from 'ink';
import { useLocation } from 'react-router';
import { TextInput } from '@muniz/ink-ui';

const Create = () => {
  return (
    <Box flexDirection="column">
      <TextInput label="描述：" placeHolder="请输入描述信息" />
      <TextInput label="模版：" placeHolder="请选择创建模版类型" />
      <TextInput label="密码：" placeHolder="请输入模版密码" type="password" />
    </Box>
  );
};

export default Create;
