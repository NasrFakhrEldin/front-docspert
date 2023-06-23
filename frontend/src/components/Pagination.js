import React from 'react';

const Pagination = ({ currentPage, hasNextPage, hasPrevPage, onPageChange }) => {
  const handlePrevPage = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div>
      {/* Render pagination controls */}
      <button onClick={handlePrevPage} disabled={!hasPrevPage}>
        Previous Page
      </button>
      <span>Page {currentPage}</span>
      <button onClick={handleNextPage} disabled={!hasNextPage}>
        Next Page
      </button>
    </div>
  );
};

export default Pagination;
