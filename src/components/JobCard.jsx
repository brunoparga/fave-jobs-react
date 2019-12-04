import React from 'react';

export default ({ jobData, favorite }) => {
  let location;
  if (jobData.remote) {
    location = (
      <span>
        This is a &nbsp;
        <strong>remote</strong>
        &nbsp; job.
      </span>
    );
  } else {
    location = (
      <span>
        This job is in&nbsp;
        {jobData.city}
        ,&nbsp;
        {jobData.country}
      </span>
    );
  }
  let isFavorite;
  if (favorite) {
    isFavorite = 'This is a favorite offer of mine!';
  } else {
    isFavorite = 'Not a favorite (yet...)';
  }
  return (
    <div className="job">
      <h3>{jobData.title}</h3>
      <h5>{isFavorite}</h5>
      <p>
        $
        {jobData.salary}
      </p>
      <p>{location}</p>
      <p>{jobData.company.name}</p>
    </div>
  );
};
