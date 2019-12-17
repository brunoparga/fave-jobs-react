import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchJobs } from '../../ducks/jobs';
import JobCard from './JobCard';
import Search from './Search';
import './index.css';

export default () => {
  const dispatch = useDispatch();

  // Get jobs from Redux state
  let [jobs] = useState([]);
  jobs = useSelector((state) => state.jobs);

  // Display jobs if available, fetch them otherwise
  let main;
  if (jobs.length > 0) {
    main = jobs.map((job) => <JobCard job={job} key={job.id} />);
  } else {
    main = <p>Loading...</p>;
    dispatch(fetchJobs(''));
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
        <Search />
      </header>
      <main>
        {main}
      </main>
    </div>
  );
};
