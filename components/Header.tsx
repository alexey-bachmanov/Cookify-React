'use client';
import React from 'react';
import { useContext } from 'react';
import UIContext from '@/stores/store';
import styles from '../styles/Header.module.css';

const Header: React.FC = function (props: any) {
  const ctx = useContext(UIContext);

  // set classes //
  const componentStyle = `${styles['header']} ${styles['mode' + ctx.mode]}`;
  console.log(componentStyle);

  return (
    <header className={componentStyle}>
      <h1>Cookify</h1>
    </header>
  );
};

export default Header;
