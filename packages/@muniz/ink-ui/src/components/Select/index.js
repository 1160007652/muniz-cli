import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Text, useInput, useFocus, useFocusManager } from 'ink';

const Select = ({ children, onBlur, wait, disabled, ...props }) => {
  let { isFocused } = useFocus({ autoFocus: true, isActive: !disabled });
  const { disableFocus, enableFocus, focusNext } = useFocusManager();

  // 防抖计时器
  let timer = null;

  useInput((_, key) => {
    if (isFocused) {
      if (key.return) {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          onBlur();
          clearTimeout(timer);
        }, wait);
      } else if (key.tab) {
        // 切换焦点后，结束 执行事件
        clearTimeout(timer);
      }
    }
  });

  return (
    <Box {...props}>
      <Box width="2">
        <Text>{isFocused ? '●' : '○'}</Text>
      </Box>
      <Text inverse={isFocused} bold={isFocused} dimColor={disabled}>
        {children}
      </Text>
    </Box>
  );
};

Select.propTypes = {
  onBlur: PropTypes.func,
  wait: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
};
Select.defaultProps = {
  onBlur: () => {},
  wait: 600,
  disabled: false,
};

export default Select;
