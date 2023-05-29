'use client';
import UIContext from '@/stores/store';
import React, { useRef, useContext } from 'react';

const SearchForm: React.FC = function () {
  const ctx = useContext(UIContext);
  const searchFormRef = useRef<HTMLInputElement>(null);

  const submitHandler = function (e: React.FormEvent) {
    e.preventDefault();
    ctx.newSearch(searchFormRef.current!.value);
  };
  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="search-input"></label>
      <input type="text" id="search-input" ref={searchFormRef} />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
