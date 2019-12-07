import React from 'react';
import { Link } from 'react-router-dom';

import './JobCard.css';

export default ({ job }) => {
  let isFavorite;
  if (job.favorite) {
    isFavorite = 'This is a favorite offer of mine!';
  } else {
    isFavorite = 'Not a favorite (yet...)';
  }

  const salary = job.salary
    .split('-')
    .map((sal) => `$${sal.trim()}`)
    .join(' - ');

  let location;
  if (job.remote) {
    location = (
      <span>
        This is a
        <strong> remote </strong>
        job.
      </span>
    );
  } else {
    location = (
      <span>
        This job is in&nbsp;
        {job.city}
        ,&nbsp;
        {job.country}
      </span>
    );
  }
  return (
    <div className="job__wrapper">
      <div className="job">
        <Link to={job.api_id} className="job__link">
          <h3>{job.company.name}</h3>
          <img src={job.logo_url} alt={job.company.name} />
          <p>{job.title}</p>
          <h5>{isFavorite}</h5>
          <p>{salary}</p>
          <p>{location}</p>
        </Link>
      </div>
    </div>
  );
};
