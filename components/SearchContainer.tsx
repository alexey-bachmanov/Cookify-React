'use client';
import React, { useContext } from 'react';
import UIContext from '@/stores/store';
import SearchForm from './SearchForm';
import PaginationController from './PaginationController';
import SearchResultDisplayItem from './SearchResultDisplayItem';
import styles from '../styles/SearchContainer.module.css';
import LoadingSpinner from './LoadingSpinner';

const SearchContainer: React.FC = function () {
  const ctx = useContext(UIContext);

  // Item list JSX
  const currentItemsJSX = ctx.searchResults.map((item) => (
    <SearchResultDisplayItem key={item.id} item={item} />
  ));

  // determine styles
  // className = 'searh-container mode0'
  const componentStyle = `${styles['search-container']} ${
    styles['mode' + ctx.mode]
  }`;

  return (
    <div className={componentStyle}>
      <SearchForm />
      {ctx.searchIsLoading && <LoadingSpinner />}
      {ctx.mode !== 0 && !ctx.searchIsLoading && <ul>{currentItemsJSX}</ul>}
      {ctx.mode !== 0 && <PaginationController />}
    </div>
  );
};

export default SearchContainer;
