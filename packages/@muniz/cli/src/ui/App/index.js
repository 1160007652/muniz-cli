import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'ink';
import { StaticRouter, Route, Switch } from 'react-router';

import { default as UI_Add } from '../Add';
import { default as UI_Help } from '../Help';
import { default as UI_Version } from '../Version';

const Create = (context) => {
  const { program, help, version, isInternalCommand } = context;
  const { input, flags } = program;
  let DynamicCommandUI = null;

  let command = input.length > 0 ? input.join('/') : 'help';

  if (flags?.help || flags?.h) {
    command = 'help';
  } else if (flags?.version || flags?.v) {
    command = 'version';
  } else if (!isInternalCommand) {
    DynamicCommandUI = require(`@muniz/muniz-plugin-${command.split('/')[0]}`).default[
      input.length > 1 ? input[1] : 'default'
    ];
  }
  return (
    <StaticRouter location={{ pathname: command, state: flags }} context={context}>
      <Switch>
        <Route exact path="help">
          <UI_Help data={help} />
        </Route>
        <Route path="version">
          <UI_Version data={version} />
        </Route>
        <Route path="add" component={UI_Add} />
        <Route path={command}>{DynamicCommandUI && <DynamicCommandUI />}</Route>
      </Switch>
    </StaticRouter>
  );
};

Create.propTypes = {
  input: PropTypes.array,
  flags: PropTypes.object,
};
Create.defaultProps = {
  input: [],
  flags: null,
};

export default Create;
