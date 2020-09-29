import React, { useState, useEffect } from 'react';
import { Box, Text, useInput, useFocus, useFocusManager, useStdin } from 'ink';
import { useLocation } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import { TextInput } from '@muniz/ink-ui';

const Create = () => {
  const { control, errors, getValues, watch } = useForm({ reValidateMode: 'onChange', mode: 'onChange' });
  const xxx = async () => {
    // await trigger('desc');
    // setError('desc', {
    //   type: 'required',
    //   message: 'Dont Forget Your Username Should Be Cool!',
    // });
    console.log(errors);
  };
  return (
    <Box flexDirection="column">
      <Controller
        control={control}
        name="desc"
        defaultValue=""
        rules={{ required: true }}
        render={({ onChange, onBlur, value }) => {
          return <TextInput label="描述：" value={value} placeHolder="请输入描述信息" onChange={onChange} />;
        }}
      />
      <Text>{errors.desc && 'First name is required'}</Text>
      <Controller
        control={control}
        name="telmplate"
        defaultValue=""
        rules={{ required: true }}
        render={({ onChange, onBlur, value }) => {
          return <TextInput label="模版：" value={value} placeHolder="请选择创建模版类型" onChange={onChange} />;
        }}
      />
      <Text>{errors.telmplate && 'First name is required'}</Text>
    </Box>
  );
};

export default Create;
