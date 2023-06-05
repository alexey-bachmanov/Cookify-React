import React from 'react';
import { RecipeDetails } from '@/types/types';
import styles from '../../styles/RecipeContainer/RecipeInstructionList.module.css';

const RecipeInstructionList: React.FC<{ recipeDetails: RecipeDetails }> =
  function ({ recipeDetails }) {
    return (
      <>
        {recipeDetails?.analyzedInstructions[0]?.steps && (
          <section className={styles['recipe-instructions']}>
            <h3>Instructions</h3>
            <ol>
              {recipeDetails!.analyzedInstructions[0].steps.map((step) => (
                <li key={step.number}>{step.step}</li>
              ))}
            </ol>
          </section>
        )}
      </>
    );
  };

export default RecipeInstructionList;
