import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import JobIndex from '../components/JobIndex';
import JobDetails from '../components/JobDetails';

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" component={JobIndex} />
      <Route path="/:id" component={JobDetails} />
    </Switch>
  </Router>
);
