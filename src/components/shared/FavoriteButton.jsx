import React from 'react';

import './FavoriteButton.css';

export default ({ favorite }) => {
  if (favorite) {
    return (
      <button type="button" className="fave-button fave-button--yes">
        <span className="fave-button__text fave-button__text--normal">Favorite job!</span>
      </button>
    );
  }
  return (
    <button type="button" className="fave-button fave-button--no">
      Add to favorites
    </button>
  );
};
