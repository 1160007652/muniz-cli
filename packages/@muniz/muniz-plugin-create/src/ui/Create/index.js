import React from 'react';
import { Text } from 'ink';
import { useLocation } from 'react-router';

const Create = () => {
  let location = useLocation();
  console.log(location);
  return <Text>创建项目命令</Text>;
};

export default Create;
