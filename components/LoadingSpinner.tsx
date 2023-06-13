import React from 'react';
import styles from '../styles/LoadingSpinner.module.css';

const LoadingSpinner: React.FC = function () {
  return <div className={styles.spinner}></div>;
};

export default LoadingSpinner;
