import React from 'react';

export default ({ query, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <input value={query} onChange={handleChange} />
    <button type="submit">Search jobs</button>
  </form>
);
