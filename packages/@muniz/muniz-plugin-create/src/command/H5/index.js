import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * @muniz
 * @type function
 * @description 创建H5开发模版
 * */
function H5(props) {
  console.log('创建 H5 React 开发模版 ， 暂未接入脚手架');
}

H5.propTypes = {
  /**
   * @muniz
   * @description 创建H5开发模版
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

H5.defaultProps = {
  flags: 'wowowoowqqqqqqq',
  isGit: false,
  count: 1,
};

export default H5;
