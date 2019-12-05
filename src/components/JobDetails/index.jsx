import React from 'react';
import { useRouteMatch } from 'react-router-dom';

export default () => {
  const match = useRouteMatch();
  return <p>{match.params.id}</p>;
};
