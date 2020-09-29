import React, { useState, useEffect } from 'react';
import { Text, useInput, useFocusManager } from 'ink';

const Input = ({ onChange, placeholder, value, type }) => {
  const [desc, setDesc] = useState(value);
  const [position, setPosition] = useState(value.length);
  const { focusNext } = useFocusManager();

  useInput((input, key) => {
    if (key.return) {
      // 回车, 切换到下一个 焦点
      focusNext();
    } else if (key.delete) {
      // 删除, 从尾部依次删除输入的数据
      const str = desc.substring(0, position - 1) + desc.substring(position, desc.length);
      setDesc(str);
      setPosition(position > 0 ? position - 1 : 0);
    } else if (key.leftArrow) {
      // 左键
      setPosition(position > 0 ? position - 1 : 0);
    } else if (key.rightArrow) {
      // 右键
      setPosition(position < desc.length ? position + 1 : desc.length);
    } else if (
      !(key.escape || key.tab || key.downArrow || key.upArrow || key.pageDown || key.pageUp || key.ctrl || key.meta)
    ) {
      const str = desc.substring(0, position) + input + desc.substring(position, desc.length);

      setDesc(str);
      setPosition(position + input.length);
    }
  });

  useEffect(() => {
    onChange(desc);
  }, [desc]);

  function renderValue(data) {
    return data.map((item, index) => {
      if (index === position) {
        return (
          <Text inverse key={index}>
            {item}
          </Text>
        );
      } else {
        return item;
      }
    });
  }

  let showDesc = type === 'password' ? '*'.repeat(desc.length) : desc;
  showDesc = showDesc + ' ';

  if (desc) {
    showDesc = renderValue(showDesc.split(''));
  } else {
    showDesc = <Text dimColor>{renderValue(placeholder.split(''))}</Text>;
  }

  return (
    <Text color="green" cursor={3}>
      {showDesc}
    </Text>
  );
};

export default Input;
