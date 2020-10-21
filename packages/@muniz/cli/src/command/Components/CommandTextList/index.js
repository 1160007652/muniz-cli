import React, { useState } from 'react';
import { Box, Text } from 'ink';
import CommandText from '../CommandText';
import CommandLabel from '../CommandLabel';

const CommandTextList = ({ data, labelColor, label }) => {
  const autoWidth = Math.max.apply(
    null,
    data.map((item) => {
      let len = item.command.length;
      if (['Options', 'Other Options'].includes(label)) {
        len += item?.default ? `Default: ${item.default} `.length : 0;
      }
      return len + 5;
    }),
  );

  return (
    <Box marginLeft={2} flexDirection="column">
      <CommandLabel color={labelColor}>{label}</CommandLabel>
      {data.map((item, index) => {
        return <CommandText key={index} data={item} width={autoWidth} />;
      })}
    </Box>
  );
};

export default CommandTextList;
