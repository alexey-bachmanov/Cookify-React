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
