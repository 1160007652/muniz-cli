import React, { useState, useEffect } from 'react';
import { Box, Text, useInput, useFocus, useFocusManager, useStdin } from 'ink';
import { useLocation } from 'react-router';

const TextInput = ({ onChange, placeholder, value }) => {
  const [desc, setDesc] = useState(value);

  useInput((input, key) => {
    if (!key.tab) {
      setDesc(desc + input);
    }
  });

  useEffect(() => {
    onChange(desc);
  }, [desc]);

  return <Text color="green">{desc || placeholder}</Text>;
};

const Item = ({ label }) => {
  const { isFocused } = useFocus();
  const [value, setValue] = useState('');
  return (
    <Text>
      {label} {isFocused ? <TextInput value={value} onChange={setValue} placeholder={label} /> : value}
    </Text>
  );
};

const Create = () => {
  let location = useLocation();

  return (
    <Box flexDirection="column">
      <Item label="请输入描述信息:" />
      <Item label="请选择创建模版类型:" />
    </Box>
  );
};

export default Create;
