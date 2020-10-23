import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'ink';
import { StaticRouter, Route, Switch } from 'react-router';
import { Help, Version } from '@muniz/ink-ui';
import { default as UI_Add } from '../Add';
// import { default as UI_Help } from '../Help';
// import { default as UI_Version } from '../Version';

/**
 * @muniz
 * @description 这是入口命令
 */
const App = (context) => {
  const {} = context;

  return (
    <StaticRouter location={{ pathname: command, state: flags }} context={context}>
      <Switch>
        <Route exact path="help">
          <Help data={help} />
        </Route>
        <Route path="version">
          <Version data={version} />
        </Route>
        <Route path="add" component={UI_Add} />
        <Route path={command}>{DynamicCommandUI ? <DynamicCommandUI /> : <Text>不存在该命令</Text>}</Route>
      </Switch>
    </StaticRouter>
  );
};

App.propTypes = {
  /**
   * @muniz
   * @description 描述组件
   * @alias i
   */
  input: PropTypes.string.isRequired,
  /**
   * @muniz
   */
  flags: PropTypes.object,
  /**
   * @muniz
   * @description 生成项目的名称
   * @alias n
   */
  isGit: PropTypes.bool,
};

App.defaultProps = {
  input: 'ssss',
  flags: null,
  isGit: false,
};

export default App;
