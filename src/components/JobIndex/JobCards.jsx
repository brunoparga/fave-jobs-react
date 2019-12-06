import React from 'react';
import { Link } from 'react-router-dom';

import JobCard from './JobCard';
import './JobCards.css';

export default ({ jobs }) => {
  const renderJobs = jobs.map((job) => (
    <Link to={job.api_id} className="job__link" key={job.id}>
      <JobCard
        jobData={job}
        favorite={job.favorite}
      />
    </Link>
  ));
  return (
    <>
      {renderJobs}
    </>
  );
};
