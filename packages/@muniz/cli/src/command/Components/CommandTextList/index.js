import React, { useState } from 'react';
import { Box, Text } from 'ink';
import CommandText from '../CommandText';
import CommandLabel from '../CommandLabel';

const CommandTextList = ({ data, labelColor, label }) => {
  const commandWidth = Math.max.apply(
    null,
    data.map((item) => {
      console.log(item);
      let len = item?.key?.length || 0;
      if (item?.alias) {
        len += `, -${item.alias}`.length;
      }

      return len + 5;
    }),
  );
  const defaultWidth = Math.max.apply(
    null,
    data.map((item) => {
      let len = 0;
      if (['Options', 'Other Options'].includes(label)) {
        len += item?.default ? `Default: ${item.default} `.length : 0;
      }
      return len + 5;
    }),
  );

  const typeWidth = Math.max.apply(
    null,
    data.map((item) => {
      let len = 0;
      if (['Options', 'Other Options'].includes(label)) {
        len += item?.type ? `Type: ${item.type} `.length : 0;
      }
      return len + 5;
    }),
  );

  return (
    <Box marginLeft={2} flexDirection="column">
      <CommandLabel color={labelColor}>{label}</CommandLabel>
      {data.map((item, index) => {
        return (
          <CommandText
            key={index}
            data={item}
            commandWidth={commandWidth}
            defaultWidth={defaultWidth}
            typeWidth={typeWidth}
            label={label}
          />
        );
      })}
    </Box>
  );
};

export default CommandTextList;
