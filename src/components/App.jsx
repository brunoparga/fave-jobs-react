import React, { useEffect, useState } from 'react';

import { fetchJobs } from '../actions';
import JobCard from './JobCard';
import './App.css';

export default () => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    async function fetchWrapper() {
      const newJobs = await fetchJobs();
      setJobs(newJobs);
    }
    fetchWrapper();
  }, []);
  const renderJobs = jobs.map((job) => (
    <JobCard
      jobData={JSON.parse(job.data)}
      favorite={job.favorite}
      key={job.id}
    />
  ));
  return (
    <div className="app">
      <header className="app__header">
        <h1>My Favorite Job Offers</h1>
        <p className="app__powered-by">
          powered by&nbsp;
          <a href="https://www.getonbrd.com/">Get on Board</a>
        </p>
      </header>
      {renderJobs}
    </div>
  );
};
