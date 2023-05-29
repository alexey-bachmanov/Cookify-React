'use client';
import React, { useContext, useEffect, useState } from 'react';
import styles from '../styles/RecipeContainer.module.css';
import UIContext from '@/stores/store';
import Image from 'next/image';

const initRecipe = {
  id: 654911,
  title: 'Pasta With Cream Sauce and Mushrooms',
  image: 'https://spoonacular.com/recipeImages/654911-556x370.jpg',
  readyInMinutes: 45,
  servings: 4,
  sourceURL:
    'http://www.foodista.com/recipe/K8BDZPPD/pasta-with-cream-sauce-and-mushrooms',
  summary: `If you have around <b>45 minutes</b> to spend in the kitchen, Pasta With Cream Sauce and Mushrooms might be an outstanding <b>dairy free</b> recipe to try. This recipe makes 4 servings with <b>558 calories</b>, <b>14g of protein</b>, and <b>29g of fat</b> each. For <b>$1.37 per serving</b>, this recipe <b>covers 22%</b> of your daily requirements of vitamins and minerals. 1 person has tried and liked this recipe. A mixture of bay leaf, white wine, margarine, and a handful of other ingredients are all it takes to make this recipe so scrumptious. It works well as a reasonably priced main course. It is brought to you by Foodista. Taking all factors into account, this recipe <b>earns a spoonacular score of 76%</b>, which is solid. Users who liked this recipe also liked <a href=\"https://spoonacular.com/recipes/pasta-with-sausage-mushrooms-and-white-wine-cream-sauce-590820\">Pasta with Sausage, Mushrooms and White Wine Cream Sauce</a>, <a href=\"https://spoonacular.com/recipes/crispy-baked-pasta-with-mushrooms-sausage-and-parmesan-cream-sauce-667564\">Crispy Baked Pasta with Mushrooms, Sausage, and Parmesan Cream Sauce</a>, and <a href=\"https://spoonacular.com/recipes/crispy-baked-pasta-with-mushrooms-sausage-and-parmesan-cream-sauce-1203613\">Crispy Baked Pasta with Mushrooms, Sausage, and Parmesan Cream Sauce</a>.`,
};

const RecipeContainer: React.FC = function () {
  const ctx = useContext(UIContext);
  const [recipeData, setRecipeData] = useState(initRecipe);

  // pull recipe info off spoonacular with useEffect
  useEffect(() => {
    const getRecipeDetails = async function (recipeID: number) {
      const response = await fetch(
        `/api/recipeDetails?recipeID=${ctx.currentRecipeID}`
      );
      if (!response.ok) {
        console.error('Failed to fetch recipe details');
        return {};
      }
      const data = await response.json();
      setRecipeData(data);
    };
    getRecipeDetails(ctx.currentRecipeID);
  }, [ctx.currentRecipeID]);

  // set styles
  const isShown = ctx.recipeDrawerShown;
  const componentStyle = `${styles['recipe-container']} ${
    isShown ? '' : styles.hidden
  }`;

  return (
    <div className={componentStyle}>
      <h2>{recipeData?.title}</h2>
      <Image
        src={recipeData?.image}
        width={480}
        height={300}
        alt={recipeData?.title}
      />
      <p>{recipeData?.summary}</p>
    </div>
  );
};

export default RecipeContainer;
