export type ContextShape = {
  searchDrawerShown: boolean;
  recipeDrawerShown: boolean;
  currentRecipeID: number;
  currentPage: number;
  itemsPerPage: number;
  searchResults: SearchResult[];
  numResults: number;
  showSearch: () => void;
  showRecipe: () => void;
  incrPage: () => void;
  decrPage: () => void;
  setPage: (arg: number) => void;
  newSearch: (arg: string) => void;
  changeCurrentRecipe: (arg: number) => void;
};

export type SearchResult = {
  id: number;
  title: string;
  image: string;
};

export type IngredientEntry = {
  id: number;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: any;
  measures: {
    us: {
      amount: number;
      unitShort: string;
      unitLong: string;
    };
    metric: {
      amount: number;
      unitShort: string;
      unitLong: string;
    };
  };
};

export type InstructionStep = {
  number: number;
  step: string;
  ingredients: {
    id: number;
    name: string;
    localizedName: string;
    image: string;
  }[];
  equipment: {
    id: number;
    name: string;
    localizedName: string;
    image: string;
  }[];
  length?: {
    number: number;
    unit: string;
  };
};

export type RecipeDetails = null | {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  lowFodmap: boolean;
  weightWatcherSmartPoints: number;
  gaps: string;
  preparationMinutes: number;
  cookingMinutes: number;
  aggregateLikes: number;
  healthScore: number;
  creditsText: string;
  license: string;
  sourceName: string;
  pricePerServing: number;
  extendedIngredients: IngredientEntry[];
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  image: string;
  imageType: string;
  summary: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  occasions: string[];
  winePairing: {
    pairedWines: string[];
    pairingText: string;
    productMatches: [];
  };
  instructions: string;
  analyzedInstructions: {
    name: string;
    steps: InstructionStep[];
  }[];
  originalId: string | null;
  spoonacularSourceUrl: string;
};
