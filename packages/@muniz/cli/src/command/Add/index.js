import React from 'react';
import { Text } from 'ink';
import { useLocation } from 'react-router';

/**
 * @muniz
 * @description 添加插件
 */
const Add = () => {
  let location = useLocation();
  console.log(location);

  return <Text>添加插件命令</Text>;
};

export default Add;
