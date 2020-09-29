import React, { useState, useEffect, useRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Box, Text, useInput, useFocus, useFocusManager } from 'ink';
import { default as Input } from '../Input';

const TextInput = ({ name, label, value, placeHolder, type, onChange, forwardRef }) => {
  const { isFocused } = useFocus({ autoFocus: true });
  const [_value, setValue] = useState(value);
  const showValue = type === 'password' ? '*'.repeat(_value.length) : _value;
  useEffect(() => {
    onChange(_value);
    // forwardRef.register({ name, _value });
    // console.log(forwardRef);
  }, [_value]);

  const onBlur = () => {
    console.log('失去焦点');
  };
  /** 暴露出去, 可以调用的ref */
  // useImperativeHandle(forwardRef, () => ({
  //   onChange,
  //   value,
  //   onBlur,
  // }));

  return (
    <Box>
      <Text>
        {label}
        {isFocused ? <Input value={_value} onChange={setValue} type={type} placeholder={placeHolder} /> : showValue}
      </Text>
    </Box>
  );
};

TextInput.propTypes = {
  onChange: PropTypes.func,
  type: PropTypes.string,
  placeHolder: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
};
TextInput.defaultProps = {
  onChange: () => {},
  type: '',
  placeHolder: '',
  value: '',
  label: '',
  name: '',
};

// export default React.forwardRef((props, ref) => {
//   return <TextInput {...props} forwardRef={ref} />;
// });

export default TextInput;
