import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * @muniz
 * @type function
 * @description 创建脚手架插件模版
 * */
function Plugin(props) {
  console.log('创建 脚手架 Muniz plugin 开发模版');
}

Plugin.propTypes = {
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

Plugin.defaultProps = {
  flags: 'wowowoowqqqqqqq',
  isGit: false,
  count: 1,
};

export default Plugin;
