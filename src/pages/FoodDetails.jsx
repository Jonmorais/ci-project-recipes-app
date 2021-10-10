import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import CopyButton from '../components/CopyButton';
import FavoriteButton from '../components/FoodFavoriteButton';

import './RecipeDetails.css';

function FoodDetails() {
  const [foodDetails, setFoodDetails] = useState([]);
  const [recommendedDrinks, setRecommendedDrinks] = useState([]);

  // No magic Numbers
  const firstSixRecommendedCards = 6;

  const values = []; // usar na renderização de ingredientes
  const measures = []; // usar na renderização de medidas dos ingredientes

  const { id } = useParams();

  // Fetch para detalhes de uma receita
  useEffect(() => {
    const fetchMeal = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const { meals } = await response.json();

      setFoodDetails(meals);
    };
    fetchMeal();
  }, [id]);

  // Fetch para drinks recomendados
  useEffect(() => {
    const fetchRecommended = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const { drinks } = await response.json();

      setRecommendedDrinks(drinks.slice(0, firstSixRecommendedCards));
    };
    fetchRecommended();
  }, []);

  if (!foodDetails.length || !recommendedDrinks.length) {
    return <h2>Loading Recipe Details...</h2>;
  }

  // Renderizando os ingredientes com o método includes
  if (foodDetails) {
    Object.keys(foodDetails[0])
      .forEach((key) => {
        if (key.includes('strIngredient') && foodDetails[0][key]) {
          const ingredientNumber = key.split('strIngredient')[1];
          const measure = foodDetails[0][`strMeasure${ingredientNumber}`];
          values.push(foodDetails[0][key]);
          measures.push(measure);
        }
      });
  }

  const youtubeUrl = foodDetails[0].strYoutube.replace('watch?v=', 'embed/');

  return (
    <div>
      <img
        src={ foodDetails[0].strMealThumb }
        alt={ foodDetails[0].strMeal }
        data-testid="recipe-photo"
        height="250px"
      />
      <div>
        <h3 data-testid="recipe-title">{ foodDetails[0].strMeal }</h3>
      </div>
      <div>
        <CopyButton />
        <FavoriteButton />
      </div>
      <h4
        data-testid="recipe-category"
        className="category-text"
      >
        { foodDetails[0].strCategory }
      </h4>
      <div>
        <h3>Ingredients</h3>
        <ul>
          {
            values.map((ingredient, index) => {
              if (ingredient !== '' && ingredient !== null) {
                return (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    { ingredient }
                    { ' - ' }
                    { measures[index] }
                  </li>);
              }
              return null; // Pro lint não reclamar :(
            })
          }
        </ul>
      </div>
      <div>
        <h3>Instructions</h3>
        <p data-testid="instructions">{ foodDetails[0].strInstructions }</p>
      </div>
      <div>
        <h3>Vídeo</h3>
        <iframe
          src={ youtubeUrl }
          frameBorder="0"
          data-testid="video"
          title="recipe"
          allowFullScreen
          ng-show="showvideo"
        />
      </div>
      <h3>Recomendations</h3>
      <div className="flex carousel">
        {
          recommendedDrinks.map((recommendations, index) => (
            <div
              key={ recommendations.idDrink }
              data-testid={ `${index}-recomendation-card` }
              className="recipe-card"
            >
              <img
                src={ recommendations.strDrinkThumb }
                alt={ recommendations.strDrink }
                height="150px"
              />
              <p className="category-text">{ recommendations.strCategory }</p>
              <p
                data-testid={ `${index}-recomendation-title` }
              >
                { recommendations.strDrink }
              </p>
            </div>
          ))
        }
        {/* <img src="" alt="" data-testid={ `${index}-recomendation-card` } /> */}
      </div>
      <div className="align-center">
        <Link
          to={ `/comidas/${id}/in-progress` }
          data-testid="start-recipe-btn"
          className="button"
        >
          Iniciar Receita
        </Link>
      </div>
    </div>
  );
}

export default FoodDetails;
