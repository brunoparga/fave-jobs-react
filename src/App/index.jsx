import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import JobIndex from '../components/JobIndex';
import JobDetails from '../components/JobDetails';
import store from '../store';

export default () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={JobIndex} />
        <Route path="/:id" component={JobDetails} />
      </Switch>
    </Router>
  </Provider>
);
