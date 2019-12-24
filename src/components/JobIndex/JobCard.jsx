import React from 'react';
import { Link } from 'react-router-dom';

import FavoriteButton from '../shared/FavoriteButton';
import './JobCard.css';
import '../shared/job.css';

export default ({ job }) => {
  const salary = job.salary
    .split('-')
    .map((amount) => `$${amount.trim()}`)
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
    location = <span>{`This job is in ${job.city}, ${job.country}`}</span>;
  }
  return (
    <div className="job__wrapper">
      <div className="job job--card">
        <Link to={job.api_id} className="job__link">
          <h3>{job.company.name}</h3>
          <img
            src={job.logo_url}
            alt={job.company.name}
            className="job__logo"
          />
          <p>{job.title}</p>
          <p>{salary}</p>
          <p>{location}</p>
        </Link>
        <FavoriteButton job={job} />
      </div>
    </div>
  );
};
