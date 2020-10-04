import React from 'react';
import { Text } from 'ink';
import { useLocation } from 'react-router';

const Home = () => {
  let location = useLocation();
  console.log(location);

  return <Text>添加插件命令</Text>;
};

export default Home;
