import React from 'react';
import { Text } from 'ink';
import { useLocation, useHistory, useParams, useRouteMatch } from 'react-router';
import { TextInput } from '@muniz/ink-ui';

const Home = () => {
  let location = useLocation();
  let history = useHistory();
  let params = useParams();
  let match = useRouteMatch();
  console.log(location, params, match);

  return (
    <Text>
      <TextInput> sssss </TextInput> 添加插件命令
    </Text>
  );
};

export default Home;
