import React, { useCallback, useEffect, useState } from 'react';

import { fetchJobs } from '../../actions';
import JobCard from './JobCard';
import Search from './Search';
import './index.css';

export default () => {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState('');
  const fetchWrapper = useCallback(
    async () => {
      const newJobs = await fetchJobs(query);
      setJobs(newJobs);
    }, [query],
  );
  useEffect(() => {
    fetchWrapper();
  }, [fetchWrapper, query]);
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWrapper();
  };
  const handleChange = (event) => setQuery(event.target.value);
  return (
    <div className="index">
      <header>
        <h1>My Favorite Job Offers</h1>
        <p className="index__powered-by">
          powered by&nbsp;
          <a
            href="https://www.getonbrd.com/"
            className="index__link"
          >
            Get on Board
          </a>
        </p>
        <Search
          query={query}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </header>
      <main>
        {jobs.map((job) => <JobCard job={job} key={job.id} />)}
      </main>
    </div>
  );
};
