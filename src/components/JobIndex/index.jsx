import React, { useEffect, useState } from 'react';

import { fetchJobs } from '../../actions';
import JobCards from './JobCards';
import './index.css';

export default () => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const fetchWrapper = async () => {
      const newJobs = await fetchJobs();
      setJobs(newJobs);
    };
    fetchWrapper();
  }, []);
  return (
    <div className="index">
      <header>
        <h1>My Favorite Job Offers</h1>
        <p className="index__powered-by">
          powered by&nbsp;
          <a href="https://www.getonbrd.com/">Get on Board</a>
        </p>
      </header>
      <JobCards jobs={jobs} />
    </div>
  );
};