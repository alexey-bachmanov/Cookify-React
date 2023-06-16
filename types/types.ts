export type ContextShape = {
  // basic info
  mode: number;
  currentRecipeID: number;
  currentPage: number;
  itemsPerPage: number;
  currentNumResults: number;
  // lists
  searchResults: SearchResult[];
  bookmarkList: SearchResult[];
  // mode switches
  searchIsLoading: boolean;
  recipeIsLoading: boolean;
  isInBookmarkMode: boolean;
  // basic handlers
  setMode: (mode: number) => void;
  newSearch: (query: string) => void;
  changeCurrentRecipe: (recipeID: number) => void;
  // pagination handling
  incrPage: () => void;
  decrPage: () => void;
  setPage: (page: number) => void;
  // loading state handling
  setRecipeIsLoading: (isLoading: boolean) => void;
  // bookmark handling
  toggleBookmarkMode: () => void;
  addBookmark: (recipeData: RecipeDetails) => void;
  removeBookmark: (recipeData: RecipeDetails) => void;
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
