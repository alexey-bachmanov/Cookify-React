import React, { useContext } from 'react';
import UIContext from '@/stores/store';
import styles from '../styles/PaginationController.module.css';

const PaginationController: React.FC = function () {
  const ctx = useContext(UIContext);

  // ///// NAVIGATE A LONG ARRAY OF RESULTS /////
  // // pagination logic //
  // const totalPages = Math.ceil(ctx.searchResults.length / ctx.itemsPerPage);

  // // pagination buttons JSX //
  // const numButtons = 4; // number of buttons to each side of current page
  // // find paginationStart, such that current page is always in the middle, and
  // // the range is clamped between page 1 and last page
  // const paginationStart = Math.max(
  //   1,
  //   Math.min(ctx.currentPage - numButtons, totalPages - numButtons * 2 - 1)
  // );
  // const paginationLength = Math.min(numButtons * 2 + 1, totalPages);
  // const paginationButtons = Array.from(
  //   { length: paginationLength },
  //   (_, index) => index + paginationStart
  // ); //array of page #'s

  // // build array of buttons: [<, curpage-2, curpg-1, curpg, curpg+1, curpg+2, >]
  // const paginationButtonsJSX = [
  //   <button key={'back'} onClick={ctx.decrPage}>
  //     {'<'}
  //   </button>,
  //   paginationButtons.map((page) => (
  //     <button key={page} onClick={() => ctx.setPage(page)}>
  //       {page}
  //     </button>
  //   )),
  //   <button key={'fwd'} onClick={ctx.incrPage}>
  //     {'>'}
  //   </button>,
  // ];

  ///// CONTROL REQUESTS TO AN API /////
  const totalPages = Math.ceil(ctx.numResults / ctx.itemsPerPage);

  // pagination buttons JSX //
  const numButtons = 4; // number of buttons to each side of current page
  // find paginationStart, such that current page is always in the middle, and
  // the range is clamped between page 1 and last page
  const paginationStart = Math.max(
    1,
    Math.min(ctx.currentPage - numButtons, totalPages - numButtons * 2 - 1)
  );
  const paginationLength = Math.min(numButtons * 2 + 1, totalPages);
  const paginationButtons = Array.from(
    { length: paginationLength },
    (_, index) => index + paginationStart
  ); //array of page #'s

  // build array of buttons: [<, curpage-2, curpg-1, curpg, curpg+1, curpg+2, >]
  const paginationButtonsJSX = [
    <button key={'back'} onClick={ctx.decrPage}>
      {'<'}
    </button>,
    paginationButtons.map((page) => (
      <button key={page} onClick={() => ctx.setPage(page)}>
        {page}
      </button>
    )),
    <button key={'fwd'} onClick={ctx.incrPage}>
      {'>'}
    </button>,
  ];

  return (
    <div className={styles['pagination-controller']}>
      {paginationButtonsJSX}
    </div>
  );
};

export default PaginationController;
