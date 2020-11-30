import React, { useState } from 'react';
import PropTypes from 'prop-types';

import prompts from './prompts';

/**
 * @muniz
 * @type function
 * @description 创建Chrome插件扩展
 * */
async function Extension(props) {
  const anwser = await prompts();
  console.log(anwser);
  console.log('创建 Chrome extensions 扩展插件 React 开发模版 ， 暂未接入脚手架');
}

Extension.propTypes = {
  /**
   * @muniz
   * @description falgs哈哈
   */
  flags: PropTypes.string,
  /**
   * @muniz
   * @description Number类型转换
   */
  count: PropTypes.number,
  /**
   * @muniz
   * @description 生成项目的名称
   * @alias n
   */
  isGit: PropTypes.bool,
};

Extension.defaultProps = {
  flags: 'wowowoowqqqqqqq',
  isGit: false,
  count: 1,
};

export default Extension;
