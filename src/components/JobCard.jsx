import React from 'react';

export default ({ job }) => {
  let location;
  if (job.remote) {
    location = (
      <p>
        This is a
        {' '}
        <strong>remote</strong>
        {' '}
        job.
      </p>
    );
  } else {
    location = (
      <p>
        This job is in
        {' '}
        {job.city}
        ,
        {' '}
        {job.country}
      </p>
    );
  }
  return (
    <div className="job">
      <h3>{job.title}</h3>
      <p>
        $
        {job.salary}
      </p>
      <div>{location}</div>
      <p>{job.company.name}</p>

    </div>
  );
};
