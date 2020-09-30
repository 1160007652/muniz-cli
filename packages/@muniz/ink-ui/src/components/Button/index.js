import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Text, useFocus } from 'ink';

const Button = ({ children, onBlur, interval, ...props }) => {
  const { isFocused } = useFocus({ autoFocus: true });
  const [time, setTime] = useState(Number(interval));

  // 如果获得焦点，触发点击事件
  useEffect(() => {
    let timer = null;
    if (isFocused) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          const curentTime = prevTime - 1;
          if (curentTime === 0) {
            clearInterval(timer);
          }
          return curentTime;
        });
      }, 1000);
    } else {
      setTime(Number(interval));
    }
    return () => {
      clearInterval(timer);
    };
  }, [isFocused]);

  useEffect(() => {
    if (time === 0) {
      onBlur();
    }
  }, [time]);

  return (
    <Box {...props}>
      <Text inverse={isFocused}>
        {children}
        {isFocused && <Text>{`(${time}s)`}</Text>}
      </Text>
    </Box>
  );
};

Button.propTypes = {
  onBlur: PropTypes.func,
  interval: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
Button.defaultProps = {
  onBlur: () => {},
  interval: 3,
};

export default Button;
