import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { fetchJob } from '../../ducks/jobs';
import JobPage from './JobPage';

export default () => {
  const match = useRouteMatch();
  const [job, setJob] = useState(null);
  useEffect(() => {
    const wrapper = async () => {
      const newJob = await fetchJob(match.params.id);
      setJob(newJob);
    };
    wrapper();
  }, [match.params.id]);
  if (!job) {
    return <p>Loading...</p>;
  }
  return <JobPage job={job} />;
};
