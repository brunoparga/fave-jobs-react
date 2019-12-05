import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';

import { fetchJob } from '../../actions';

export default () => {
  const match = useRouteMatch();
  const [job, setJob] = useState({ title: 'Loading...' });
  useEffect(() => {
    const wrapper = async () => {
      const newJob = await fetchJob(match.params.id);
      setJob(newJob);
    };
    wrapper();
  }, [match.params.id]);
  return (
    <div className="job-details">
      <h1>{job.title}</h1>
    </div>
  );
};
