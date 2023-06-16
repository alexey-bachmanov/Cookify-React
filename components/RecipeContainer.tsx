'use client';
import React, { useContext, useEffect, useState } from 'react';
import styles from '../styles/RecipeContainer.module.css';
import UIContext from '@/stores/store';
import Image from 'next/image';
import { RecipeDetails } from '@/types/types';
import RecipeSummary from './RecipeContainer/RecipeSummary';
import RecipeIngredientList from './RecipeContainer/ReccipeIngredientList';
import RecipeInstructionList from './RecipeContainer/RecipeInstructionList';
import LoadingSpinner from './LoadingSpinner';
import bookmarkEmptyAdd from '../app/images/bookmark-empty-add.svg';
import bookmarkFilledRemove from '../app/images/bookmark-filled-remove.svg';

const initRecipeNull = null;

const RecipeContainer: React.FC = function () {
  const ctx = useContext(UIContext);
  const [recipeData, setRecipeData] = useState<RecipeDetails>(initRecipeNull);
  const recipeIsBookmarked = ctx.bookmarkList.some(
    (element) => element.id === recipeData?.id
  );
  // pull recipe info off spoonacular with useEffect //
  useEffect(() => {
    const getRecipeDetails = async function (recipeID: number) {
      ctx.setRecipeIsLoading(true);
      const response = await fetch(
        `/api/recipeDetails?recipeID=${ctx.currentRecipeID}`
      );
      if (!response.ok) {
        console.error('Failed to fetch recipe details');
        return {};
      }
      const data = await response.json();
      setRecipeData(data);
      ctx.setRecipeIsLoading(false);
    };
    if (ctx.currentRecipeID > 0) {
      // don't ask for recipe details when recipeID = -1 at start

      getRecipeDetails(ctx.currentRecipeID);
    }
  }, [ctx.currentRecipeID]);

  // bookmark handler //
  const toggleBookmarkHandler = function () {
    if (recipeIsBookmarked) ctx.removeBookmark(recipeData);
    else ctx.addBookmark(recipeData);
  };

  // set styles //
  const componentStyle = `${styles['recipe-container']} ${
    styles['mode' + ctx.mode]
  }`;

  // JSX for contents to show when loaded
  const contentsJSX = recipeData && (
    <>
      <span className={styles.heading}>
        <h2>{recipeData!.title}</h2>
        <span className={styles['button-container']}>
          <button
            onClick={() => ctx.setMode(1)}
            className={styles['button-back']}
          >
            Back
          </button>
          <button
            className={styles['button-bookmark']}
            onClick={toggleBookmarkHandler}
          >
            {recipeIsBookmarked ? (
              <Image
                src={bookmarkFilledRemove}
                width={20}
                height={20}
                alt="Remove bookmark"
              />
            ) : (
              <Image
                src={bookmarkEmptyAdd}
                width={20}
                height={20}
                alt="Add bookmark"
              />
            )}
          </button>
        </span>
      </span>

      <Image
        className={styles['main-image']}
        src={recipeData!.image}
        width={480}
        height={300}
        placeholder="blur"
        blurDataURL={recipeData!.image}
        alt={recipeData!.title}
      />
      <RecipeSummary recipeDetails={recipeData} />
      <RecipeIngredientList recipeDetails={recipeData} />
      <RecipeInstructionList recipeDetails={recipeData} />
    </>
  );

  return (
    <div className={componentStyle}>
      {ctx.recipeIsLoading ? <LoadingSpinner /> : contentsJSX}
    </div>
  );
};

export default RecipeContainer;
