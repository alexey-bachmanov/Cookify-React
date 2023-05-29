import React from 'react';
import Header from '@/components/Header';
import SearchContainer from '@/components/SearchContainer';
import RecipeContainer from '@/components/RecipeContainer';

const Home: React.FC = function () {
  return (
    <>
      <Header />
      <SearchContainer />
      <RecipeContainer />
    </>
  );
};

export default Home;
