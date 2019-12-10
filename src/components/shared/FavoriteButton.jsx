import React from 'react';
import { useDispatch } from 'react-redux';

import { addFavorite, removeFavorite } from '../../ducks/jobs';
import './FavoriteButton.css';

export default ({ job }) => {
  const dispatch = useDispatch();
  if (job.favorite) {
    return (
      <button
        type="button"
        className="fave-button fave-button--yes"
        onClick={() => dispatch(removeFavorite(job))}
      >
        <span className="fave-button__text fave-button__text--normal">Favorite job!</span>
      </button>
    );
  }
  return (
    <button
      type="button"
      className="fave-button fave-button--no"
      onClick={() => dispatch(addFavorite(job))}
    >
      Add to favorites
    </button>
  );
};
