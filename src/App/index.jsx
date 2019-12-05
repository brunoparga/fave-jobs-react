import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory as history } from 'history';

import JobIndex from '../components/JobIndex';

export default () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={JobIndex} />
    </Switch>
  </Router>
);
