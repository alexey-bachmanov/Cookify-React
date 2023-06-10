'use client';
import React, { useState } from 'react';
import { ContextShape, SearchResult } from '@/types/types';

///// create context /////
const ITEMSPERPAGE = 8;
const UIContext = React.createContext<ContextShape>({
  mode: 0,
  currentPage: 1,
  numResults: 0,
  itemsPerPage: 1,
  searchResults: [],
  currentRecipeID: 0,
  setMode: () => {},
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
  const [mode, setMode] = useState<number>(0);
  // mode 0: startup view, with only header and searchbar
  // mode 1: search query entered, search result window expands
  // mode 2: recipe clicked, recipe drawer showing
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
    console.log('headers', new Map(response.headers));
    if (!response.ok) {
      // catch 404 errors etc
      console.error('Failed to fetch reipes');
      return [null, null];
    }
    const data = await response.text();
    console.log('body', data);
    let newResults = data.results.map((result: any) => {
      return { id: result.id, title: result.title, image: result.image };
    });
    return [newResults, data.totalResults];
  };

  // handler functions //
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
    if (mode === 0) setMode(1);
  };
  const changeCurrentRecipe = function (recipeID: number) {
    setCurrentRecipeID(recipeID);
    setMode(2);
  };

  // assemble context value
  const contextValue: ContextShape = {
    mode,
    currentPage,
    numResults,
    itemsPerPage: ITEMSPERPAGE,
    searchResults,
    currentRecipeID,
    setMode,
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
