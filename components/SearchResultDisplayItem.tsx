import React, { useContext } from 'react';
import Image from 'next/image';
import { SearchResult } from '@/types/types';
import styles from '../styles/SearchResultDisplayItem.module.css';
import UIContext from '@/stores/store';

const SearchResultDisplayItem: React.FC<{ item: SearchResult }> = function (
  props
) {
  const ctx = useContext(UIContext);
  const clickHandler = function () {
    ctx.changeCurrentRecipe(props.item.id);
  };
  return (
    <li className={styles['search-result-item']} onClick={clickHandler}>
      <Image
        src={props.item.image}
        width={312}
        height={231}
        placeholder="blur"
        blurDataURL={props.item.image}
        alt={props.item.title}
      />
      <h3>{props.item.title}</h3>
    </li>
  );
};

export default SearchResultDisplayItem;
