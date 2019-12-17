import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { fetchJobs } from '../../ducks/jobs';

export default () => {
  const dispatch = useDispatch();

  const [query, setQuery] = useState('');
  const handleChange = (event) => setQuery(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchJobs(query));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={query} onChange={handleChange} />
      <button type="submit">Search jobs</button>
    </form>
  );
};
