import React, { useMemo, useState } from 'react';

import Header from '../components/Header';
import {
  foodsPlusDrinks,
  localFavorite,
  drinks,
  foods,
} from '../services/utilities';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipes() {
  const [filterButton, setFilterButton] = useState('All');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const copiedUrlMessage = <p>Link copiado!</p>;
  // No magic Numbers
  const oneSecondDisplayCopiedLink = 1000;

  useMemo(() => {
    localFavorite.forEach((recipe) => {
      foodsPlusDrinks.push(recipe);

      if (recipe.type === 'bebida') {
        drinks.push(recipe);
      }

      if (recipe.type === 'comida') {
        foods.push(recipe);
      }
    });
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), oneSecondDisplayCopiedLink);
  };

  function filterByButton() {
    if (filterButton === 'All') {
      return (
        <div>
          {
            foodsPlusDrinks.map((recipe, index) => (
              <div key={ index }>
                <img
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                  height="150px"
                />
                <h4
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { recipe.area }
                  { ' - ' }
                  { recipe.category }
                  { ' ' }
                  { recipe.alcoholicOrNot }
                </h4>
                <h4 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h4>
                <div>
                  <button
                    type="button"
                    onClick={ handleCopy }
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                  >
                    <img src={ shareIcon } alt="share button" />
                  </button>
                  {copiedUrl && copiedUrlMessage}
                </div>
                <div
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                >
                  <button
                    type="button"
                  >
                    <img src={ blackHeartIcon } alt="Like button" />
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      );
    } if (filterButton === 'Drinks') {
      return (
        <div>
          {
            drinks.map((recipe, index) => (
              <div key={ recipe.name }>
                <img
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                  height="150px"
                />
                <h4
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { recipe.category }
                </h4>
                <h4 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h4>
                <div>
                  <button
                    type="button"
                    onClick={ handleCopy }
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                  >
                    <img src={ shareIcon } alt="share button" />
                  </button>
                  {copiedUrl && copiedUrlMessage}
                </div>
                <div
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                >
                  <button
                    type="button"
                  >
                    <img src={ blackHeartIcon } alt="Like button" />
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      );
    } if (filterButton === 'Foods') {
      return (
        <div>
          {
            foods.map((recipe, index) => (
              <div key={ index }>
                <img
                  src={ recipe.image }
                  alt={ recipe.name }
                  data-testid={ `${index}-horizontal-image` }
                  height="151px"
                />
                <h4
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { recipe.category }
                </h4>
                <h4 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h4>
                <div>
                  <button
                    type="button"
                    onClick={ handleCopy }
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                  >
                    <img src={ shareIcon } alt="share button" />
                  </button>
                  {copiedUrl && copiedUrlMessage}
                </div>
                <div
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                >
                  <button
                    type="button"
                  >
                    <img src={ blackHeartIcon } alt="Like button" />
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      );
    }
  }

  return (
    <div>
      <Header titlePage="Receitas Favoritas" />

      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilterButton('All') }
      >
        All
      </button>

      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setFilterButton('Foods') }
      >
        Foods
      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilterButton('Drinks') }
      >
        Drinks
      </button>
      { filterByButton() }
    </div>
  );
}

export default FavoriteRecipes;
