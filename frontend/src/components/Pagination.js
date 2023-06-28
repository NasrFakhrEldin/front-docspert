import React from 'react';

const Pagination = ({ currentPage, hasNextPage, hasPrevPage, onPageChange }) => {
  const handlePrevPage = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div className="pagination-container">
      <nav aria-label="Pagination">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${!hasPrevPage ? 'disabled' : ''}`}>
            <button className="page-link" onClick={handlePrevPage} disabled={!hasPrevPage}>
              Previous
            </button>
          </li>
          <li className="page-item">
            <span className="page-link">{`Page ${currentPage}`}</span>
          </li>
          <li className={`page-item ${!hasNextPage ? 'disabled' : ''}`}>
            <button className="page-link" onClick={handleNextPage} disabled={!hasNextPage}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>``
  );
};

export default Pagination;
