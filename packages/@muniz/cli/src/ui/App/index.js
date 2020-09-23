import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'ink';
import { StaticRouter, Route, Switch } from 'react-router';

import { default as UI_Add } from '../Add';
import { default as UI_Help } from '../Help';

const Create = (context) => {
  const { program, help, isInternalCommand } = context;
  const { input, flags } = program;
  let DynamicCommandUI = null;

  let command = input.length > 0 ? input.join('/') : 'help';

  if (flags?.help) {
    command = 'help';
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
