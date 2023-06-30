import React, { useEffect, useState } from 'react';
import { getAuthorBooks } from '../utils/api';
import BookCard from './BookCard';
import Pagination from './Pagination';

const MyBooks = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [selectedBook] = useState(null);

  useEffect(() => {
    const fetchAuthorBooks = async () => {
      try {
        const authorBooks = await getAuthorBooks();
        setBooks(authorBooks.results);
        setHasNextPage(authorBooks.next !== null);
        setHasPrevPage(authorBooks.previous !== null);
      } catch (error) {
        console.error('Error fetching author books:', error);
      }
    };

    fetchAuthorBooks();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  console.log("Mine:", books)

  return (
    <>
    {books.length > 0 ? (
      <>
        <BookCard books={books} selectedBook={selectedBook}/>
        <Pagination
            currentPage={currentPage}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            onPageChange={handlePageChange}
        />
      </>
      ) : (<p>No books found.</p>)
    }
  </>
  );
};

export default MyBooks;
