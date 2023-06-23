import React, { useEffect, useState } from 'react';
import { getBookById } from '../utils/api';
import { useParams, Link } from 'react-router-dom'; 

const BookDetail = ({ match }) => {
  const [book, setBook] = useState(null);
  const { id } = useParams(); 

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const bookData = await getBookById(id);
        setBook(bookData);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h1>{book.title}</h1>
      <p>Author: {book.author.username}</p>
      <p>Price: {book.price}</p>
      {/* Additional book details */}
      <Link to="/" className="btn btn-primary">Return to Book List</Link>
    </div>
  );
};

export default BookDetail;
