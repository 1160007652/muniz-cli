import React from 'react';
import { Text, Box, useFocus } from 'ink';
import { useLocation, useHistory, useParams, useRouteMatch } from 'react-router';

const Item = ({ label }) => {
  const { isFocused } = useFocus();
  return (
    <Text>
      {label} {isFocused && <Text color="green">(focused)</Text>}
    </Text>
  );
};

const Update = () => {
  const params = useLocation();
  // console.log(params);
  // return <Text>更新 Create 插件 命令 </Text>;
  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text>Press Tab to focus next element, Shift+Tab to focus previous element, Esc to reset focus.</Text>
      </Box>
      <Item label="First" />
      <Item label="Second" />
      <Item label="Third" />
    </Box>
  );
};

export default Update;
