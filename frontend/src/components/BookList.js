import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { getBooks } from '../utils/api';
import BookDetails from './BookDetails';
import Pagination from './Pagination';
// import { API_BASE_URL } from '../utils/api';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);


  const handleDetailClick = (bookId) => {
    console.log(`Clicked book ID: ${bookId}`);
  };
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
    <div className="container mt-4">
    <h1 className="mb-4">Book List</h1>
        <div className="row">
            {books.map((book) => (
                <div key={book.id} className="col-lg-6 mb-4">
                    <div className="card">
                        {/* <img src={book.coverImageUrl} className="card-img-top" alt={book.title} /> */}
                        <div className="card-body">
                            <h5 className="card-title">{book.title}</h5>
                            <p className="card-text">By: {book.author.username}</p>
                            <p className="card-text">Date: {book.publication_date}</p>
                            <p className="card-text">Price: {book.price}</p>
                            <Link to={`/books/${book.id}`} className="btn btn-primary">
                            View Details
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      {selectedBook && <BookDetails book={selectedBook} />}
      <Pagination
        currentPage={currentPage}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default BookList;
