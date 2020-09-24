import React, { useState, useEffect } from 'react';
import { Box, Text, useInput, useFocus, useFocusManager } from 'ink';
import { useLocation } from 'react-router';

const Item = ({ label }) => {
  const { focusPrevious, focusNext } = useFocusManager();
  const { isFocused } = useFocus({ autoFocus: true });
  const [desc, setDesc] = useState('');
  useEffect(() => {
    // focusPrevious();
    focusNext();
  }, []);
  useInput((input, key) => {
    setDesc(desc + input);

    if (key.leftArrow) {
      process.exit();
    }
  });
  return (
    <Text>
      {label} {isFocused && <Text color="green">{desc}</Text>}
    </Text>
  );
};

const Create = () => {
  let location = useLocation();
  // console.log(location);
  // const { isFocused } = useFocus();

  // const { focusNext } = useFocusManager();

  // useEffect(() => {
  //   focusNext();
  // }, []);

  return (
    <Box flexDirection="column">
      <Item label="请输入描述信息:" />
      <Item label="请选择创建模版类型:" />
    </Box>
  );
};

export default Create;
