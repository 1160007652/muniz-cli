import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import spinners from 'cli-spinners';
import { Box, Text } from 'ink';

const Spinner = ({ children, type, ...props }) => {
  const [frame, setFrame] = useState(0);
  const spinner = spinners[type];

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame((previousFrame) => {
        const isLastFrame = previousFrame === spinner.frames.length - 1;
        return isLastFrame ? 0 : previousFrame + 1;
      });
    }, spinner.interval);

    return () => {
      clearInterval(timer);
    };
  }, [spinner]);

  return (
    <Box>
      <Box marginRight="1">
        <Text {...props}>{spinner.frames[frame]}</Text>
      </Box>
      {children}
    </Box>
  );
};

Spinner.propTypes = {
  type: PropTypes.string,
};
Spinner.defaultProps = {
  type: 'dots',
};

export default Spinner;
