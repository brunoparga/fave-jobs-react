import React from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';

import JobPage from './JobPage';

export default () => {
  const match = useRouteMatch();
  const [job] = useSelector((state) => state.jobs.filter(
    (j) => j.api_id === match.params.id,
  ));
  return <JobPage job={job} />;
};
