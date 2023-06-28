import React, { useEffect, useState } from 'react';
import { getBookById } from '../utils/api';
import { useParams, Link } from 'react-router-dom'; 
import Pagination from './Pagination';


const BookDetail = () => {
  const [book, setBook] = useState(null);
  const { id } = useParams();
  const [number, setNumber] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {

        const bookData = await getBookById(id, number);
        setBook(bookData);
        console.log("Data:", bookData);
        setHasNextPage(bookData.pages.number < bookData.pages_length);
        setHasPrevPage(bookData.pages.number > 1);
      } catch (error) {
        console.error('Error fetching book:', error.response);
      }
    };

    fetchBook();
  }, [id, number]);

  if (!book) {
    return <div>Loading...</div>;
  }

    const handlePageChange = (number) => {
    setNumber(number);
  };

  return (
    <div className="container mt-4">
      <h1>{book.title}</h1>
      <p>Author: {book.author.username}</p>
      <p>Publication Date: {book.publication_date}</p>
      <p>Price: {book.price}</p>
      {/* set the page content here */}

      <div className="page-frame">
          <div>
            <h2>Page {book.pages.number}</h2>
            <p>{book.pages.content}</p>
          </div>
      </div>

      <Pagination
        currentPage={number}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        onPageChange={handlePageChange}
      />

      <Link to="/" className="btn btn-primary">Return to Book List</Link>
    </div>
  );
};

export default BookDetail;
