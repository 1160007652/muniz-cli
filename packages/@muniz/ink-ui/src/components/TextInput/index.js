import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Text, useFocus } from 'ink';
import { default as Input } from '../Input';

const TextInput = ({ label, value, placeHolder, type, onChange, onBlur, error }) => {
  const { isFocused } = useFocus({ autoFocus: true });
  const [_value, setValue] = useState(value);
  const showValue = type === 'password' ? '*'.repeat(_value.length) : _value;

  useEffect(() => {
    setValue(value);
  }, [value]);

  useEffect(() => {
    onChange(_value);
  }, [_value]);

  // 焦点监听
  useEffect(() => {
    // 失去焦点时触发
    if (!isFocused) {
      onBlur(_value);
    }
  }, [isFocused]);

  return (
    <Box flexDirection="column">
      <Box>
        <Text bold={isFocused}>
          {label}
          {isFocused ? <Input value={_value} onChange={setValue} type={type} placeholder={placeHolder} /> : showValue}
        </Text>
      </Box>

      <Box>
        <Text>
          {error && <Text color="red">error: </Text>}
          <Text dimColor>{error}</Text>
        </Text>
      </Box>
    </Box>
  );
};

TextInput.propTypes = {
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  type: PropTypes.string,
  placeHolder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  error: PropTypes.string,
};
TextInput.defaultProps = {
  onChange: () => {},
  onBlur: () => {},
  type: '',
  placeHolder: '',
  value: '',
  label: '',
  error: '',
};

// export default React.forwardRef((props, ref) => {
//   return <TextInput {...props} forwardRef={ref} />;
// });

export default TextInput;
