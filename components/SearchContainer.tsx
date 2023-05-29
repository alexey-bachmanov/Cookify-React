'use client';
import React, { useContext } from 'react';
import UIContext from '@/stores/store';
import SearchForm from './SearchForm';
import PaginationController from './PaginationController';
import SearchResultDisplayItem from './SearchResultDisplayItem';
import styles from '../styles/SearchContainer.module.css';

const SearchContainer: React.FC = function () {
  const ctx = useContext(UIContext);

  // Item list JSX
  const currentItemsJSX = ctx.searchResults.map((item) => (
    <SearchResultDisplayItem key={item.id} item={item} />
  ));

  // determine styles
  const isShown = ctx.searchDrawerShown;
  const isSquished = ctx.recipeDrawerShown;
  const componentStyle = `${styles['search-container']} ${
    isShown ? '' : styles.hidden
  } ${isSquished ? styles.squished : styles.full}`;

  return (
    <div className={componentStyle}>
      <h2>Search Container</h2>
      <SearchForm />
      <ul>{currentItemsJSX}</ul>
      <PaginationController />
    </div>
  );
};

export default SearchContainer;
