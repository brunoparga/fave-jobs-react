import React from 'react';
import { Link } from 'react-router-dom';

import JobCard from './JobCard';
import './JobCards.css';

export default ({ jobs }) => {
  const renderJobs = jobs.map((job) => {
    const jobData = JSON.parse(job.data);
    return (
      <Link to={jobData.id} className="job__link" key={job.id}>
        <JobCard
          jobData={jobData}
          favorite={job.favorite}
        />
      </Link>
    );
  });
  return (
    <>
      {renderJobs}
    </>
  );
};
