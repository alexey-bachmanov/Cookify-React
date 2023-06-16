'use client';
import UIContext from '@/stores/store';
import React, { useRef, useContext } from 'react';
import styles from '../styles/SearchForm.module.css';
import Image from 'next/image';
import bookmarkEmpty from '@/app/images/bookmark-empty.svg';
import bookmarkFilled from '@/app/images/bookmark-filled.svg';

const SearchForm: React.FC = function () {
  const ctx = useContext(UIContext);
  const searchFormRef = useRef<HTMLInputElement>(null);

  const submitHandler = function (e: React.FormEvent) {
    e.preventDefault();
    ctx.newSearch(searchFormRef.current!.value);
  };

  return (
    <form onSubmit={submitHandler} className={styles['search-form']}>
      <label htmlFor="search-input"></label>
      <input
        type="text"
        id="search-input"
        ref={searchFormRef}
        placeholder="Search for recipes..."
      />
      <button type="submit" className={styles['button-submit']}>
        Search
      </button>
      <button
        type="button"
        className={styles['button-bookmark']}
        onClick={ctx.toggleBookmarkMode}
      >
        {ctx.isInBookmarkMode ? (
          <Image src={bookmarkFilled} width={20} height={20} alt="Bookmarks" />
        ) : (
          <Image src={bookmarkEmpty} width={20} height={20} alt="Bookmarks" />
        )}
      </button>
    </form>
  );
};

export default SearchForm;
