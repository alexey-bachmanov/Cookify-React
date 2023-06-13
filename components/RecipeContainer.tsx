'use client';
import React, { useContext, useEffect, useState } from 'react';
import styles from '../styles/RecipeContainer.module.css';
import UIContext from '@/stores/store';
import Image from 'next/image';
import { Interweave } from 'interweave';
import { RecipeDetails } from '@/types/types';
import RecipeSummary from './RecipeContainer/RecipeSummary';
import RecipeIngredientList from './RecipeContainer/ReccipeIngredientList';
import RecipeInstructionList from './RecipeContainer/RecipeInstructionList';
import LoadingSpinner from './LoadingSpinner';

const initRecipe: RecipeDetails = {
  vegetarian: false,
  vegan: false,
  glutenFree: false,
  dairyFree: true,
  veryHealthy: false,
  cheap: false,
  veryPopular: false,
  sustainable: false,
  lowFodmap: false,
  weightWatcherSmartPoints: 15,
  gaps: 'no',
  preparationMinutes: -1,
  cookingMinutes: -1,
  aggregateLikes: 1,
  healthScore: 42,
  creditsText: 'Foodista.com – The Cooking Encyclopedia Everyone Can Edit',
  license: 'CC BY 3.0',
  sourceName: 'Foodista',
  pricePerServing: 137.26,
  extendedIngredients: [
    {
      id: 2004,
      aisle: 'Produce;Spices and Seasonings',
      image: 'bay-leaves.jpg',
      consistency: 'SOLID',
      name: 'bay leaf',
      nameClean: 'bay leaves',
      original: '1 bay leaf',
      originalName: 'bay leaf',
      amount: 1.0,
      unit: '',
      meta: [],
      measures: {
        us: {
          amount: 1.0,
          unitShort: '',
          unitLong: '',
        },
        metric: {
          amount: 1.0,
          unitShort: '',
          unitLong: '',
        },
      },
    },
    {
      id: 20421,
      aisle: 'Pasta and Rice',
      image: 'fusilli.jpg',
      consistency: 'SOLID',
      name: 'pasta',
      nameClean: 'cooked pasta',
      original: '1 pound pasta, cooked',
      originalName: 'pasta, cooked',
      amount: 1.0,
      unit: 'pound',
      meta: ['cooked'],
      measures: {
        us: {
          amount: 1.0,
          unitShort: 'lb',
          unitLong: 'pound',
        },
        metric: {
          amount: 453.592,
          unitShort: 'g',
          unitLong: 'grams',
        },
      },
    },
    {
      id: 2036,
      aisle: 'Produce;Spices and Seasonings',
      image: 'rosemary.jpg',
      consistency: 'SOLID',
      name: 'rosemary',
      nameClean: 'rosemary',
      original: '1/4 teaspoon dried rosemary',
      originalName: 'dried rosemary',
      amount: 0.25,
      unit: 'teaspoon',
      meta: ['dried'],
      measures: {
        us: {
          amount: 0.25,
          unitShort: 'tsps',
          unitLong: 'teaspoons',
        },
        metric: {
          amount: 0.25,
          unitShort: 'tsps',
          unitLong: 'teaspoons',
        },
      },
    },
    {
      id: 2042,
      aisle: 'Spices and Seasonings',
      image: 'thyme.jpg',
      consistency: 'SOLID',
      name: 'thyme',
      nameClean: 'dried thyme',
      original: '1/4 teaspoon dried thyme',
      originalName: 'dried thyme',
      amount: 0.25,
      unit: 'teaspoon',
      meta: ['dried'],
      measures: {
        us: {
          amount: 0.25,
          unitShort: 'tsps',
          unitLong: 'teaspoons',
        },
        metric: {
          amount: 0.25,
          unitShort: 'tsps',
          unitLong: 'teaspoons',
        },
      },
    },
    {
      id: 20081,
      aisle: 'Baking',
      image: 'flour.png',
      consistency: 'SOLID',
      name: 'flour',
      nameClean: 'wheat flour',
      original: '1/4 cup flour',
      originalName: 'flour',
      amount: 0.25,
      unit: 'cup',
      meta: [],
      measures: {
        us: {
          amount: 0.25,
          unitShort: 'cups',
          unitLong: 'cups',
        },
        metric: {
          amount: 59.147,
          unitShort: 'ml',
          unitLong: 'milliliters',
        },
      },
    },
    {
      id: 11215,
      aisle: 'Produce',
      image: 'garlic.png',
      consistency: 'SOLID',
      name: 'garlic',
      nameClean: 'garlic',
      original: '1 cloves garlic (1 to 2)',
      originalName: 'garlic (1 to 2)',
      amount: 1.0,
      unit: 'cloves',
      meta: ['(1 to 2)'],
      measures: {
        us: {
          amount: 1.0,
          unitShort: 'cloves',
          unitLong: 'clove',
        },
        metric: {
          amount: 1.0,
          unitShort: 'cloves',
          unitLong: 'clove',
        },
      },
    },
    {
      id: 4073,
      aisle: 'Milk, Eggs, Other Dairy',
      image: 'butter-sliced.jpg',
      consistency: 'SOLID',
      name: 'margarine',
      nameClean: 'margarine',
      original: '1/4 cup margarine',
      originalName: 'margarine',
      amount: 0.25,
      unit: 'cup',
      meta: [],
      measures: {
        us: {
          amount: 0.25,
          unitShort: 'cups',
          unitLong: 'cups',
        },
        metric: {
          amount: 59.147,
          unitShort: 'ml',
          unitLong: 'milliliters',
        },
      },
    },
    {
      id: 4053,
      aisle: 'Oil, Vinegar, Salad Dressing',
      image: 'olive-oil.jpg',
      consistency: 'LIQUID',
      name: 'olive oil',
      nameClean: 'olive oil',
      original: '1/4 cup olive oil',
      originalName: 'olive oil',
      amount: 0.25,
      unit: 'cup',
      meta: [],
      measures: {
        us: {
          amount: 0.25,
          unitShort: 'cups',
          unitLong: 'cups',
        },
        metric: {
          amount: 59.147,
          unitShort: 'ml',
          unitLong: 'milliliters',
        },
      },
    },
    {
      id: 11282,
      aisle: 'Produce',
      image: 'brown-onion.png',
      consistency: 'SOLID',
      name: 'onions',
      nameClean: 'onion',
      original: '2 tablespoons chopped onions',
      originalName: 'chopped onions',
      amount: 2.0,
      unit: 'tablespoons',
      meta: ['chopped'],
      measures: {
        us: {
          amount: 2.0,
          unitShort: 'Tbsps',
          unitLong: 'Tbsps',
        },
        metric: {
          amount: 2.0,
          unitShort: 'Tbsps',
          unitLong: 'Tbsps',
        },
      },
    },
    {
      id: 2027,
      aisle: 'Produce;Spices and Seasonings',
      image: 'oregano.jpg',
      consistency: 'SOLID',
      name: 'oregano',
      nameClean: 'oregano',
      original: '1 teaspoon oregano',
      originalName: 'oregano',
      amount: 1.0,
      unit: 'teaspoon',
      meta: [],
      measures: {
        us: {
          amount: 1.0,
          unitShort: 'tsp',
          unitLong: 'teaspoon',
        },
        metric: {
          amount: 1.0,
          unitShort: 'tsp',
          unitLong: 'teaspoon',
        },
      },
    },
    {
      id: 11583,
      aisle: 'Produce',
      image: 'mixed-vegetables.png',
      consistency: 'SOLID',
      name: 'vegetables',
      nameClean: 'mixed vegetables',
      original: '2 cups fresh vegetables*, cut into small',
      originalName: 'fresh vegetables*, cut into small',
      amount: 2.0,
      unit: 'cups',
      meta: ['fresh', 'cut into small'],
      measures: {
        us: {
          amount: 2.0,
          unitShort: 'cups',
          unitLong: 'cups',
        },
        metric: {
          amount: 473.176,
          unitShort: 'ml',
          unitLong: 'milliliters',
        },
      },
    },
    {
      id: 2047,
      aisle: 'Spices and Seasonings',
      image: 'salt.jpg',
      consistency: 'SOLID',
      name: 'salt',
      nameClean: 'table salt',
      original: '1/2 teaspoon salt',
      originalName: 'salt',
      amount: 0.5,
      unit: 'teaspoon',
      meta: [],
      measures: {
        us: {
          amount: 0.5,
          unitShort: 'tsps',
          unitLong: 'teaspoons',
        },
        metric: {
          amount: 0.5,
          unitShort: 'tsps',
          unitLong: 'teaspoons',
        },
      },
    },
    {
      id: 16223,
      aisle: 'Milk, Eggs, Other Dairy',
      image: 'soy-milk.jpg',
      consistency: 'LIQUID',
      name: 'soymilk',
      nameClean: 'soymilk',
      original: '1 2/3 cups soymilk',
      originalName: 'soymilk',
      amount: 1.6666666,
      unit: 'cups',
      meta: [],
      measures: {
        us: {
          amount: 1.667,
          unitShort: 'cups',
          unitLong: 'cups',
        },
        metric: {
          amount: 394.313,
          unitShort: 'ml',
          unitLong: 'milliliters',
        },
      },
    },
    {
      id: 2032,
      aisle: 'Spices and Seasonings',
      image: 'white-pepper.png',
      consistency: 'SOLID',
      name: 'pepper',
      nameClean: 'white pepper',
      original: '1/2 teaspoon white pepper',
      originalName: 'white pepper',
      amount: 0.5,
      unit: 'teaspoon',
      meta: ['white'],
      measures: {
        us: {
          amount: 0.5,
          unitShort: 'tsps',
          unitLong: 'teaspoons',
        },
        metric: {
          amount: 0.5,
          unitShort: 'tsps',
          unitLong: 'teaspoons',
        },
      },
    },
    {
      id: 14106,
      aisle: 'Alcoholic Beverages',
      image: 'white-wine.jpg',
      consistency: 'LIQUID',
      name: 'white wine',
      nameClean: 'dry white wine',
      original: '100ml white wine',
      originalName: 'white wine',
      amount: 100.0,
      unit: 'ml',
      meta: [],
      measures: {
        us: {
          amount: 3.382,
          unitShort: 'fl. oz',
          unitLong: 'fl. ozs',
        },
        metric: {
          amount: 100.0,
          unitShort: 'ml',
          unitLong: 'milliliters',
        },
      },
    },
  ],
  id: 654911,
  title: 'Pasta With Cream Sauce and Mushrooms',
  readyInMinutes: 45,
  servings: 4,
  sourceUrl:
    'http://www.foodista.com/recipe/K8BDZPPD/pasta-with-cream-sauce-and-mushrooms',
  image: 'https://spoonacular.com/recipeImages/654911-556x370.jpg',
  imageType: 'jpg',
  summary:
    'If you have around <b>45 minutes</b> to spend in the kitchen, Pasta With Cream Sauce and Mushrooms might be an outstanding <b>dairy free</b> recipe to try. This recipe makes 4 servings with <b>558 calories</b>, <b>14g of protein</b>, and <b>29g of fat</b> each. For <b>$1.37 per serving</b>, this recipe <b>covers 22%</b> of your daily requirements of vitamins and minerals. 1 person has tried and liked this recipe. A mixture of bay leaf, white wine, margarine, and a handful of other ingredients are all it takes to make this recipe so scrumptious. It works well as a reasonably priced main course. It is brought to you by Foodista. Taking all factors into account, this recipe <b>earns a spoonacular score of 76%</b>, which is solid. Users who liked this recipe also liked <a href="https://spoonacular.com/recipes/pasta-with-sausage-mushrooms-and-white-wine-cream-sauce-590820">Pasta with Sausage, Mushrooms and White Wine Cream Sauce</a>, <a href="https://spoonacular.com/recipes/crispy-baked-pasta-with-mushrooms-sausage-and-parmesan-cream-sauce-667564">Crispy Baked Pasta with Mushrooms, Sausage, and Parmesan Cream Sauce</a>, and <a href="https://spoonacular.com/recipes/crispy-baked-pasta-with-mushrooms-sausage-and-parmesan-cream-sauce-1203613">Crispy Baked Pasta with Mushrooms, Sausage, and Parmesan Cream Sauce</a>.',
  cuisines: [],
  dishTypes: ['side dish', 'lunch', 'main course', 'main dish', 'dinner'],
  diets: ['dairy free'],
  occasions: [],
  winePairing: {
    pairedWines: [],
    pairingText:
      'No one wine will suit every pasta dish. Pasta in a tomato-based sauce will usually work well with a medium-bodied red, such as a montepulciano or chianti. Pasta with seafood or pesto will fare better with a light-bodied white, such as a pinot grigio. Cheese-heavy pasta can pair well with red or white - you might try a sangiovese wine for hard cheeses and a chardonnay for soft cheeses. We may be able to make a better recommendation if you ask again with a specific pasta dish.',
    productMatches: [],
  },
  instructions:
    '<ol><li>* (Try broccoli, mushrooms, cauliflower, and zucchini)</li><li>In a large saucepan, heat the olive oil over low heat. Add the onion and garlic, and saute until tender. Add the oregano, thyme, and rosemary, and saute a few minutes more. Add the wine and bring to a boil.</li><li>Add the soymilk, margarine, salt, pepper-and bay leaf. Return the mixture to a boil, stirring occasionally until the margarine melts. Add the flour a tablespoon at a time, whisking after each addition to avoid lumps. Stir until the mixture thickens, about 2 minutes.</li><li>Place the vegetables in a steamer or metal sieve over boiling water and steam until just tender. To serve, toss the vegetables with the freshly cooked pasta. Pour the sauce over the pasta and vegetables, and toss to mix.</li><li>Yield 4servings.</li></ol>',
  analyzedInstructions: [
    {
      name: '',
      steps: [
        {
          number: 1,
          step: '* (Try broccoli, mushrooms, cauliflower, and zucchini)In a large saucepan, heat the olive oil over low heat.',
          ingredients: [
            {
              id: 11135,
              name: 'cauliflower',
              localizedName: 'cauliflower',
              image: 'cauliflower.jpg',
            },
            {
              id: 11260,
              name: 'mushrooms',
              localizedName: 'mushrooms',
              image: 'mushrooms.png',
            },
            {
              id: 4053,
              name: 'olive oil',
              localizedName: 'olive oil',
              image: 'olive-oil.jpg',
            },
            {
              id: 11090,
              name: 'broccoli',
              localizedName: 'broccoli',
              image: 'broccoli.jpg',
            },
            {
              id: 11477,
              name: 'zucchini',
              localizedName: 'zucchini',
              image: 'zucchini.jpg',
            },
          ],
          equipment: [
            {
              id: 404669,
              name: 'sauce pan',
              localizedName: 'sauce pan',
              image: 'sauce-pan.jpg',
            },
          ],
        },
        {
          number: 2,
          step: 'Add the onion and garlic, and saute until tender.',
          ingredients: [
            {
              id: 11215,
              name: 'garlic',
              localizedName: 'garlic',
              image: 'garlic.png',
            },
            {
              id: 11282,
              name: 'onion',
              localizedName: 'onion',
              image: 'brown-onion.png',
            },
          ],
          equipment: [],
        },
        {
          number: 3,
          step: 'Add the oregano, thyme, and rosemary, and saute a few minutes more.',
          ingredients: [
            {
              id: 2036,
              name: 'rosemary',
              localizedName: 'rosemary',
              image: 'rosemary.jpg',
            },
            {
              id: 2027,
              name: 'oregano',
              localizedName: 'oregano',
              image: 'oregano.jpg',
            },
            {
              id: 2049,
              name: 'thyme',
              localizedName: 'thyme',
              image: 'thyme.jpg',
            },
          ],
          equipment: [],
        },
        {
          number: 4,
          step: 'Add the wine and bring to a boil.',
          ingredients: [
            {
              id: 14084,
              name: 'wine',
              localizedName: 'wine',
              image: 'red-wine.jpg',
            },
          ],
          equipment: [],
        },
        {
          number: 5,
          step: 'Add the soymilk, margarine, salt, pepper-and bay leaf. Return the mixture to a boil, stirring occasionally until the margarine melts.',
          ingredients: [
            {
              id: 4073,
              name: 'margarine',
              localizedName: 'margarine',
              image: 'butter-sliced.jpg',
            },
            {
              id: 2004,
              name: 'bay leaves',
              localizedName: 'bay leaves',
              image: 'bay-leaves.jpg',
            },
            {
              id: 16223,
              name: 'soymilk',
              localizedName: 'soymilk',
              image: 'soy-milk.jpg',
            },
            {
              id: 1002030,
              name: 'pepper',
              localizedName: 'pepper',
              image: 'pepper.jpg',
            },
            {
              id: 2047,
              name: 'salt',
              localizedName: 'salt',
              image: 'salt.jpg',
            },
          ],
          equipment: [],
        },
        {
          number: 6,
          step: 'Add the flour a tablespoon at a time, whisking after each addition to avoid lumps. Stir until the mixture thickens, about 2 minutes.',
          ingredients: [
            {
              id: 20081,
              name: 'all purpose flour',
              localizedName: 'all purpose flour',
              image: 'flour.png',
            },
          ],
          equipment: [
            {
              id: 404661,
              name: 'whisk',
              localizedName: 'whisk',
              image: 'whisk.png',
            },
          ],
          length: {
            number: 2,
            unit: 'minutes',
          },
        },
        {
          number: 7,
          step: 'Place the vegetables in a steamer or metal sieve over boiling water and steam until just tender. To serve, toss the vegetables with the freshly cooked pasta.',
          ingredients: [
            {
              id: 20421,
              name: 'cooked pasta',
              localizedName: 'cooked pasta',
              image: 'fusilli.jpg',
            },
            {
              id: 11583,
              name: 'vegetable',
              localizedName: 'vegetable',
              image: 'mixed-vegetables.png',
            },
            {
              id: 14412,
              name: 'water',
              localizedName: 'water',
              image: 'water.png',
            },
          ],
          equipment: [
            {
              id: 405600,
              name: 'sieve',
              localizedName: 'sieve',
              image: 'strainer.png',
            },
          ],
        },
        {
          number: 8,
          step: 'Pour the sauce over the pasta and vegetables, and toss to mix.Yield 4servings.',
          ingredients: [
            {
              id: 11583,
              name: 'vegetable',
              localizedName: 'vegetable',
              image: 'mixed-vegetables.png',
            },
            {
              id: 20420,
              name: 'pasta',
              localizedName: 'pasta',
              image: 'fusilli.jpg',
            },
            {
              id: 0,
              name: 'sauce',
              localizedName: 'sauce',
              image: '',
            },
          ],
          equipment: [],
        },
      ],
    },
  ],
  originalId: null,
  spoonacularSourceUrl:
    'https://spoonacular.com/pasta-with-cream-sauce-and-mushrooms-654911',
};
const initRecipeNull = null;

const RecipeContainer: React.FC = function () {
  const ctx = useContext(UIContext);
  const [recipeData, setRecipeData] = useState<RecipeDetails>(initRecipeNull);

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

  // set styles //
  const componentStyle = `${styles['recipe-container']} ${
    styles['mode' + ctx.mode]
  }`;

  // JSX for contents to show when loaded
  const contentsJSX = recipeData && (
    <>
      <span>
        <h2>{recipeData!.title}</h2>
        <button onClick={() => ctx.setMode(1)}>Back</button>
      </span>

      <Image
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
