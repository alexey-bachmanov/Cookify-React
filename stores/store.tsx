'use client';
import React, { useState } from 'react';
import { ContextShape, SearchResult } from '@/types/types';

///// create context /////
const ITEMSPERPAGE = 8;
const UIContext = React.createContext<ContextShape>({
  searchDrawerShown: false,
  recipeDrawerShown: false,
  currentPage: 1,
  numResults: 0,
  itemsPerPage: 1,
  searchResults: [],
  currentRecipeID: 0,
  showSearch: () => {},
  showRecipe: () => {},
  incrPage: () => {},
  decrPage: () => {},
  setPage: () => {},
  newSearch: () => {},
  changeCurrentRecipe: () => {},
});

///// create context provider /////
const UIContextProvider = function ({
  children,
}: {
  children: React.ReactNode;
}) {
  // state declarations //
  const [searchDrawerShown, setSearchDrawerShown] = useState<boolean>(true);
  const [recipeDrawerShown, setRecipeDrawerShown] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numResults, setNumResults] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [currentRecipeID, setCurrentRecipeID] = useState<number>(-1);

  // fetching function //
  const getRecipeList = async function (query: string, pageNum: number) {
    const response = await fetch(
      `/api/recipes?query=${query}&number=${ITEMSPERPAGE}&offset=${
        (pageNum - 1) * ITEMSPERPAGE
      }`
    );
    if (!response.ok) {
      // catch 404 errors etc
      console.error('Failed to fetch reipes');
      return [null, null];
    }
    const data = await response.json();
    let newResults = data.results.map((result: any) => {
      return { id: result.id, title: result.title, image: result.image };
    });
    return [newResults, data.totalResults];
  };

  // handler functions //
  const showSearch = function () {
    setSearchDrawerShown(true);
  };
  const showRecipe = function () {
    setRecipeDrawerShown(true);
  };
  const incrPage = async function () {
    const totalPages = Math.ceil(numResults / ITEMSPERPAGE);
    const [newResults, _] = await getRecipeList(
      searchQuery,
      Math.min(currentPage + 1, totalPages)
    );
    setSearchResults(newResults);
    setCurrentPage((curPage) => Math.min(curPage + 1, totalPages));
  };
  const decrPage = async function () {
    const [newResults, _] = await getRecipeList(
      searchQuery,
      Math.max(1, currentPage - 1)
    );
    setSearchResults(newResults);
    setCurrentPage((curPage) => Math.max(1, curPage - 1));
  };
  const setPage = async function (pageNum: number) {
    const [newResults, _] = await getRecipeList(searchQuery, pageNum);
    setSearchResults(newResults);
    setCurrentPage(pageNum);
  };
  const newSearch = async function (query: string) {
    const [newResults, totalResults] = await getRecipeList(query, 1);
    setSearchResults(newResults);
    setNumResults(totalResults);
    setCurrentPage(1);
    setSearchQuery(query);
  };
  const changeCurrentRecipe = function (recipeID: number) {
    setCurrentRecipeID(recipeID);
  };

  // assemble context value
  const contextValue: ContextShape = {
    searchDrawerShown,
    recipeDrawerShown,
    currentPage,
    numResults,
    itemsPerPage: ITEMSPERPAGE,
    searchResults,
    currentRecipeID,
    showSearch,
    showRecipe,
    incrPage,
    decrPage,
    setPage,
    newSearch,
    changeCurrentRecipe,
  };

  return (
    <UIContext.Provider value={contextValue}>{children}</UIContext.Provider>
  );
};

export { UIContextProvider };
export default UIContext;
