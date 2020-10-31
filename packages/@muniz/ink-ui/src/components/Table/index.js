import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'ink';
import { table } from 'table';

/**
 * Table 容器
 */
const Table = ({ data, config, children, ...props }) => {
  return (
    <Box {...props}>
      <Text>{config ? table(data, config) : table(data)}</Text>
      {children}
    </Box>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  config: PropTypes.object,
};
Table.defaultProps = {
  data: [],
  config: null,
};

export default Table;
