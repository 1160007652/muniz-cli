import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * @muniz
 * @type function
 * @description 创建PC端开发模版
 * */
function Pc(props) {
  console.log('创建 PC React 开发模版');
}

Pc.propTypes = {
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

Pc.defaultProps = {
  flags: 'wowowoowqqqqqqq',
  isGit: false,
  count: 1,
};

export default Pc;
