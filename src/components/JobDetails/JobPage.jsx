import React from 'react';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';

import FavoriteButton from '../shared/FavoriteButton';
import './JobPage.css';
import '../shared/job.css';

export default ({ job }) => {
  const onSite = (
    <span>
      {`${job.city}, ${job.country}`}
      &nbsp;
      <img
        src={job.country_flag_url}
        alt={`flag of ${job.country}`}
        height="25px"
      />
    </span>
  );
  const location = job.remote ? 'remote' : onSite;
  const salary = job.salary
    .split('-')
    .map((sal) => `$${sal.trim()}`)
    .join(' - ');
  const parsedGroup = (
    <div className="job__text">
      {job.description ? parse(job.description) : null}
      {job.functions ? parse(job.functions) : null}
      {job.benefits ? parse(job.benefits) : null}
    </div>
  );
  return (
    <div className="job job--details">
      <Link to="/">
        <small>
          {'<'}
          - back
        </small>
      </Link>
      <h1>{job.title}</h1>
      <div className="btn-container">
        <FavoriteButton job={job} />
        <br />
        <img src={job.logo_url} alt={`${job.company.name} logo`} />
      </div>
      <p>
        Published on&nbsp;
        {job.published_at}
        &nbsp;|&nbsp;
        See on&nbsp;
        <a href={`https://getonbrd.com${job.url}`}>Get on Board</a>
      </p>
      <p>
        {job.seniority}
        &nbsp;|&nbsp;
        {salary}
        &nbsp;|&nbsp;
        {job.modality}
        &nbsp;|&nbsp;
        {location}
      </p>
      {parsedGroup}
    </div>
  );
};
