import React, { useState, useEffect } from 'react';
import { getBooks } from '../utils/api';
import Pagination from './Pagination';
import BookCard from './BookCard';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [selectedBook] = useState(null);


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksData = await getBooks(currentPage);
        setBooks(booksData.results);
        setHasNextPage(booksData.next !== null);
        setHasPrevPage(booksData.previous !== null);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <BookCard books={books} selectedBook={selectedBook}/>
      <Pagination
        currentPage={currentPage}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default BookList;
