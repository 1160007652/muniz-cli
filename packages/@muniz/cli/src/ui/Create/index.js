import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'ink';

const Create = ({ input, flags }) => {
  console.log(input, flags);
  return <Text color="green">安装 {input[1]} 插件中</Text>;
};

Create.propTypes = {
  input: PropTypes.array,
  flags: PropTypes.object,
};
Create.defaultProps = {
  input: [],
  flags: null,
};

export default Create;
