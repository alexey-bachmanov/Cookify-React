import React from 'react';
import { RecipeDetails } from '@/types/types';
import { Interweave } from 'interweave';
import styles from '../../styles/RecipeContainer/RecipeIngredientList.module.css';

const RecipeIngredientList: React.FC<{ recipeDetails: RecipeDetails }> =
  function ({ recipeDetails }) {
    return (
      <>
        {recipeDetails?.extendedIngredients && (
          <section className={styles['ingredient-list']}>
            <h3>Ingredients</h3>
            <ul>
              {recipeDetails!.extendedIngredients.map((ingredient) => (
                <li key={Math.random()}>{ingredient.original}</li>
              ))}
            </ul>
          </section>
        )}
      </>
    );
  };

export default RecipeIngredientList;
