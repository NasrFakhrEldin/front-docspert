import React from 'react';
import { Link } from 'react-router-dom';
import BookDetails from './BookDetails';

const BookCard = ({ books, selectedBook }) => {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Book List</h1>
      <div className="row">
        {books.map((book) => (
          <div key={book.id} className="col-lg-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">Author: {book.author.username}</p>
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
    </div>
  );
};

export default BookCard;
