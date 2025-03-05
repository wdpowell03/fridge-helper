import React, { useState } from 'react';
import axios from 'axios';
import "./IngredientInput.css";

function IngredientInput() {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);

  const handleInputChange = (evt) => {
    setIngredients(evt.target.value);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
        params: {
          ingredients: ingredients,
          number: 10, 
          ranking: 2, 
          apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY
        }
      });
      setRecipes(response.data); 
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };
  return (
    <>
      <div className="navbar is-fixed-top" style={{ backgroundColor: '#B4C6B0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
     
      </div>

   
      <div className="container" style={{ marginTop: '6rem' }}>
        <form onSubmit={handleSubmit} className="box">
          <div className="field">
            <label className="label">Need Help Cleaning Out Your Fridge?</label>
            <p className="sub-label">Enter ingredients below that would be tossed if you didn't use them today</p>

            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Enter ingredients..."
                value={ingredients}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="control">
            <button className="button is-primary" type="submit">Get Recipes</button>
          </div>
        </form>
      </div>

 
      <div className="container">
        <div className="columns is-multiline">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="column is-one-third">
              <div className="box">
                <h2 className="title is-4">{recipe.title}</h2>
                <figure className="image is-4by3">
                  <img src={recipe.image} alt={recipe.title} />
                </figure>
                <a
                  href={`https://spoonacular.com/recipes/${recipe.title.replace(/ /g, '-')}-${recipe.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button is-link mt-2"
                >
                  View Recipe
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default IngredientInput;
