import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'ink';
import { MemoryRouter, StaticRouter, Route, Switch } from 'react-router';

import { default as Home } from './Home';
import { default as Create1 } from './Create';

const Create = (context) => {
  const { program } = context;
  const { input, flags } = program;
  console.log(flags);

  const command = input.length > 0 ? input[0] : 'help';

  return (
    <StaticRouter location={{ pathname: command, state: flags }} context={context}>
      <Switch>
        <Route exact path="help" component={Home} />
        <Route path="create" component={Create1} />
      </Switch>
    </StaticRouter>
  );
  // return <Text color="green">插件中</Text>;
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
