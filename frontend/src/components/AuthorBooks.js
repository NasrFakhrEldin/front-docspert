import React, { useState, useEffect } from 'react';
import { getAuthorBooks, getAuthorPages } from '../utils/api'; 

const AuthorBooks = ({ authorId }) => {
  const [books, setBooks] = useState([]);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchBooksAndPages = async () => {
      try {
        const booksData = await getAuthorBooks(authorId);
        const pagesData = await getAuthorPages(authorId);
        setBooks(booksData);
        setPages(pagesData);
      } catch (error) {
        console.error('Error fetching author data:', error);
      }
    };

    fetchBooksAndPages();
  }, [authorId]);

  return (
    <div>
      <h2>My Books</h2>
      {books.map((book) => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          {/* Display book details */}
        </div>
      ))}
      <h2>My Pages</h2>
      {pages.map((page) => (
        <div key={page.id}>
          <h3>{page.content}</h3>
          {/* Display page details */}
        </div>
      ))}
    </div>
  );
}


export default AuthorBooks;
