import React from 'react';
import { Text } from 'ink';
import { useLocation, useHistory, useParams, useRouteMatch } from 'react-router';

const Ad = () => {
  const params = useLocation();
  console.log(params);
  return <Text>更新 Create 插件 命令 </Text>;
};

export default Ad;
