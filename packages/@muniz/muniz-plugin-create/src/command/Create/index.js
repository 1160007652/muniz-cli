import React, { useState } from 'react';
import { TextInput, Button, ButtonGroup } from '@muniz/ink-ui';
import { Box, Text, useApp, useFocusManager } from 'ink';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';

// 表单验证器规则
const schema = yup.object().shape({
  name: yup.string().required(),
  desc: yup.string().required(),
  telmplate: yup.string().required(),
});

// 创建指令
const Create = (props) => {
  const { focusNext } = useFocusManager();
  const { exit } = useApp();
  // 执行步骤
  const [step, setStep] = useState({
    cloneGit: false,
    help: false,
  });
  // 表单收集
  const { control, errors, reset, handleSubmit, getValues, setValue } = useForm({
    reValidateMode: 'onChange',
    mode: 'all',
    // resolver: yupResolver(schema),
  });

  // 提交表单数据
  const onSubmit = (data) => {
    setStep((state) => {
      state.cloneGit = true;
      state.help = true;
      return state;
    });
    // exit();
  };

  return (
    <Box flexDirection="column">
      <Box marginBottom="1">
        <Text color="green">Step-1: 收集用户输入信息</Text>
      </Box>
      <Controller
        control={control}
        name="name"
        defaultValue=""
        render={({ onChange, onBlur, value }) => {
          return (
            <TextInput
              label="名称："
              value={value}
              placeHolder="请输入项目名称"
              onChange={onChange}
              onBlur={onBlur}
              error={errors.name?.message}
            />
          );
        }}
      />
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
      {!step.cloneGit && (
        <ButtonGroup marginTop="1">
          <Button
            marginRight="3"
            disabled={Object.keys(errors).length > 0}
            interval="2"
            onBlur={handleSubmit(onSubmit)}
          >
            确认
          </Button>
          <Button
            interval={2}
            marginRight="3"
            onBlur={() => {
              exit();
            }}
          >
            取消
          </Button>
          <Button
            interval={2}
            onBlur={() => {
              reset();
              setStep((state) => {
                state.cloneGit = false;
                return state;
              });
              setTimeout(() => {
                focusNext();
              }, 100);
            }}
          >
            重置
          </Button>
        </ButtonGroup>
      )}

      {step.cloneGit && (
        <Box marginTop="1" flexDirection="column">
          <Text color="green">Step-2: 开始克隆模版工程</Text>

          <Box>
            <Text>克隆完毕：100%</Text>
          </Box>
        </Box>
      )}

      {step.help && (
        <Box marginTop="1" flexDirection="column">
          <Text color="green">Step-3: 使用帮助</Text>
          <Text>进入项目: cd testProject</Text>
          <Text>进入项目: npm install</Text>
        </Box>
      )}
    </Box>
  );
};

Create.propTypes = {
  /**
   * @muniz
   * @description falgs哈哈
   */
  flags: PropTypes.string,
  /**
   * @muniz
   * @description Number类型转换
   */
  count: PropTypes.number,
  /**
   * @muniz
   * @description 生成项目的名称
   * @alias n
   */
  isGit: PropTypes.bool,
};

Create.defaultProps = {
  flags: 'wowowoowqqqqqqq',
  isGit: false,
  count: 1,
};

export default Create;
