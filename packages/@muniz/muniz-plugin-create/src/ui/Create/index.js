import React, { useState, useEffect } from 'react';
import { Box, Text, useInput, useFocus, useFocusManager, useStdin } from 'ink';
import { useLocation } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';

import { TextInput, Button } from '@muniz/ink-ui';

// 表单验证器规则
const schema = yup.object().shape({
  desc: yup.string().required(),
  telmplate: yup.number('请输入数字').positive('必须是正整数').integer('数字').required('必填项'),
});

// 提交表单数据
const onSubmit = (data) => console.log(data);

// 创建指令
const Create = () => {
  const { focusNext } = useFocusManager();

  const { control, errors, reset, handleSubmit } = useForm({
    reValidateMode: 'onChange',
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  return (
    <Box flexDirection="column">
      <Controller
        control={control}
        name="desc"
        defaultValue=""
        render={({ onChange, onBlur, value }) => {
          return (
            <TextInput
              label="描述："
              value={value}
              placeHolder="请输入描述信息"
              onChange={onChange}
              onBlur={onBlur}
              error={errors.desc?.message}
            />
          );
        }}
      />
      <Controller
        control={control}
        name="telmplate"
        defaultValue=""
        render={({ onChange, onBlur, value }) => {
          return (
            <TextInput
              type="number"
              label="模版："
              value={value}
              placeHolder="请选择创建模版类型"
              onChange={onChange}
              onBlur={onBlur}
              error={errors.telmplate?.message}
            />
          );
        }}
      />

      <Box marginTop="1">
        <Button marginRight="3" interval="2" onBlur={handleSubmit(onSubmit)}>
          确认
        </Button>
        <Button
          interval={2}
          marginRight="3"
          onBlur={() => {
            process.exit();
          }}
        >
          取消
        </Button>
        <Button
          interval={2}
          onBlur={() => {
            reset();
            setTimeout(() => {
              focusNext();
            }, 100);
          }}
        >
          重置
        </Button>
      </Box>
    </Box>
  );
};

export default Create;
