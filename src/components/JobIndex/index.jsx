import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchJobs } from '../../ducks/jobs';
import JobCard from './JobCard';
import Search from './Search';
import './index.css';

export default () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  useEffect(() => {
    dispatch(fetchJobs(query));
  }, [dispatch, query]);
  const jobs = useSelector((state) => state.jobs);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchJobs(query));
  };
  const handleChange = (event) => setQuery(event.target.value);
  let main;
  if (jobs) {
    main = jobs.map((job) => <JobCard job={job} key={job.id} />);
  } else {
    main = <p>Loading...</p>;
  }
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
        {main}
      </main>
    </div>
  );
};
