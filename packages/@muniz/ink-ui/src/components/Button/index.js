import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text, useInput, useFocus, useFocusManager } from 'ink';
// import { debounce } from '@muniz/cli-shared-utils';

const Button = ({ children, onBlur, wait, disabled, leftDisabled, rightDisabled, ...props }) => {
  const { isFocused } = useFocus({ autoFocus: true, isActive: !disabled });
  const { disableFocus, enableFocus, focusNext } = useFocusManager();

  // 防抖计时器
  let timer = null;

  // 是否激活焦点
  function isFocus(flag) {
    if (flag) {
      disableFocus();
    } else {
      enableFocus();
    }
  }

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
        isFocus();
      }
    }
  });

  return (
    <Box {...props}>
      <Text inverse={isFocused} dimColor={disabled}>
        {children}
      </Text>
    </Box>
  );
};

Button.propTypes = {
  onBlur: PropTypes.func,
  wait: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  leftDisabled: PropTypes.bool,
  rightDisabled: PropTypes.bool,
};
Button.defaultProps = {
  onBlur: () => {},
  wait: 600,
  disabled: false,
  leftDisabled: false,
  rightDisabled: false,
};

export default Button;
