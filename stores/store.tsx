'use client';
import React, { useState } from 'react';
import { ContextShape, RecipeDetails, SearchResult } from '@/types/types';

///// pull bookmarks from localStorage /////
let initBookmarks: SearchResult[] = [];
if (typeof window != undefined) {
  // so next.js doesn't throw errors on SSR
  if (localStorage.getItem('cookify-bookmarks')) {
    initBookmarks = JSON.parse(localStorage.getItem('cookify-bookmarks')!);
  }
}
///// create context /////
const ITEMSPERPAGE = 8;
const UIContext = React.createContext<ContextShape>({
  mode: 0,
  currentRecipeID: 0,
  currentPage: 1,
  itemsPerPage: 1,
  currentNumResults: 0,
  searchResults: [],
  bookmarkList: [],
  searchIsLoading: false,
  recipeIsLoading: false,
  isInBookmarkMode: false,
  setMode: () => {},
  newSearch: () => {},
  changeCurrentRecipe: () => {},
  incrPage: () => {},
  decrPage: () => {},
  setPage: () => {},
  setRecipeIsLoading: () => {},
  toggleBookmarkMode: () => {},
  addBookmark: () => {},
  removeBookmark: () => {},
});

///// create context provider /////
const UIContextProvider = function ({
  children,
}: {
  children: React.ReactNode;
}) {
  // state declarations //
  const [mode, setMode] = useState<number>(0);
  // mode 0: startup view, with only header and searchbar
  // mode 1: search query entered, search result window expands
  // mode 2: recipe clicked, recipe drawer showing
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentNumResults, setCurrentNumResults] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [bookmarkList, setBookmarkList] =
    useState<SearchResult[]>(initBookmarks);
  const [currentRecipeID, setCurrentRecipeID] = useState<number>(-1);
  const [searchIsLoading, setSearchIsLoading] = useState<boolean>(false);
  const [recipeIsLoading, setRecipeIsLoading] = useState<boolean>(false);
  const [isInBookmarkMode, setIsInBookmarkMode] = useState<boolean>(false);

  // fetching function //
  const getRecipeList = async function (query: string, pageNum: number) {
    setSearchIsLoading(true);
    const response = await fetch(
      `/api/recipes?query=${query}&number=${ITEMSPERPAGE}&offset=${
        (pageNum - 1) * ITEMSPERPAGE
      }`
    );
    if (!response.ok) {
      // catch 404 errors etc
      console.error('Failed to fetch reipes');
      const newResults: SearchResult[] = [];
      const numResults: number = 0;
      return { newResults, numResults };
    }
    const data = await response.json();
    const newResults: SearchResult[] = data.results.map((result: any) => {
      return { id: result.id, title: result.title, image: result.image };
    });
    const numResults: number = data.totalResults;
    setSearchIsLoading(false);
    return { newResults, numResults };
  };

  // bookmark 'fetching' function //
  const getBookmarkedRecipeList = function (pageNum: number) {
    const newResults = bookmarkList.slice(
      Math.max(0, (pageNum - 1) * ITEMSPERPAGE),
      pageNum * ITEMSPERPAGE
    );
    const numResults = bookmarkList.length;
    return { newResults, numResults };
  };

  // pagination handlers //
  const incrPage = async function () {
    const totalPages = Math.ceil(currentNumResults / ITEMSPERPAGE);
    setPage(Math.min(currentPage + 1, totalPages));
  };
  const decrPage = async function () {
    setPage(Math.max(1, currentPage - 1));
  };
  const setPage = async function (pageNum: number) {
    if (isInBookmarkMode) {
      const { newResults } = getBookmarkedRecipeList(pageNum);
      setSearchResults(newResults);
    } else {
      const { newResults } = await getRecipeList(searchQuery, pageNum);
      setSearchResults(newResults);
    }
    setCurrentPage(pageNum);
  };

  // misc. handler functions //
  const newSearch = async function (query: string) {
    const { newResults, numResults } = await getRecipeList(query, 1);
    setSearchResults(newResults);
    setCurrentNumResults(numResults);
    setCurrentPage(1);
    setSearchQuery(query);
    setIsInBookmarkMode(false);
    if (mode === 0) setMode(1);
  };
  const changeCurrentRecipe = function (recipeID: number) {
    setCurrentRecipeID(recipeID);
    setMode(2);
  };
  const toggleBookmarkMode = async function () {
    // make sure search results are open
    if (mode === 0) setMode(1);
    // set search results to page 1 bookmark slice
    if (!isInBookmarkMode) {
      setCurrentPage(1);
      const { newResults, numResults } = getBookmarkedRecipeList(1);
      setSearchResults(newResults);
      setCurrentNumResults(numResults);
    }
    if (isInBookmarkMode) {
      setCurrentPage(1);
      const { newResults, numResults } = await getRecipeList(searchQuery, 1);
      setSearchResults(newResults);
      setCurrentNumResults(numResults);
    }
    setIsInBookmarkMode((mode) => !mode);
  };
  const addBookmark = function (recipeData: RecipeDetails) {
    const newBookmark: SearchResult = {
      id: recipeData!.id,
      title: recipeData!.title,
      image: `https://spoonacular.com/recipeImages/${
        recipeData!.id
      }-312x231.jpg`,
    };
    const newBookmarkList = [newBookmark, ...bookmarkList];
    setBookmarkList(newBookmarkList);
    // update search results, if bookmarked recipes are shown
    if (isInBookmarkMode) {
      const newResults = newBookmarkList.slice(
        Math.max(0, (currentPage - 1) * ITEMSPERPAGE),
        currentPage * ITEMSPERPAGE
      );
      const numResults = newBookmarkList.length;
      setSearchResults(newResults);
      setCurrentNumResults(numResults);
    }
    localStorage.setItem('cookify-bookmarks', JSON.stringify(newBookmarkList));
  };
  const removeBookmark = function (recipeData: RecipeDetails) {
    const bookmarkIndex = bookmarkList.findIndex(
      (element) => element.id === recipeData!.id
    );
    const newBookmarkList = [
      ...bookmarkList.slice(0, bookmarkIndex),
      ...bookmarkList.slice(bookmarkIndex + 1),
    ];
    setBookmarkList(newBookmarkList);
    // update search results, if bookmarked recipes are shown
    if (isInBookmarkMode) {
      // handle deleting the last element on a page
      // 1 < pageNum < Math.ceil( (numResults-1) / ITEMSPERPAGE )
      const newPageNum = Math.max(
        1,
        Math.min(currentPage, Math.ceil((currentNumResults - 1) / ITEMSPERPAGE))
      );
      const newResults = newBookmarkList.slice(
        Math.max(0, (newPageNum - 1) * ITEMSPERPAGE),
        newPageNum * ITEMSPERPAGE
      );
      const numResults = newBookmarkList.length;
      setSearchResults(newResults);
      setCurrentNumResults(numResults);
    }
    localStorage.setItem('cookify-bookmarks', JSON.stringify(newBookmarkList));
  };

  // assemble context value
  const contextValue: ContextShape = {
    mode,
    currentRecipeID,
    currentPage,
    itemsPerPage: ITEMSPERPAGE,
    currentNumResults,
    searchResults,
    bookmarkList,
    searchIsLoading,
    recipeIsLoading,
    isInBookmarkMode,
    setMode,
    newSearch,
    changeCurrentRecipe,
    incrPage,
    decrPage,
    setPage,
    setRecipeIsLoading,
    toggleBookmarkMode,
    addBookmark,
    removeBookmark,
  };

  return (
    <UIContext.Provider value={contextValue}>{children}</UIContext.Provider>
  );
};

export { UIContextProvider };
export default UIContext;
