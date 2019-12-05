import React from 'react';

import JobCard from './JobCard';

export default ({ jobs }) => (
  <>
    {jobs.map((job) => (
      <JobCard
        jobData={JSON.parse(job.data)}
        favorite={job.favorite}
        key={job.id}
      />
    ))}
  </>
);
