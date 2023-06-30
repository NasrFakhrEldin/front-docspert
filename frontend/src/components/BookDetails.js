import React, { useEffect, useState } from 'react';
import { getBookById, getUserInfo, deleteBook, deletePage } from '../utils/api';
import { useParams, Link, useNavigate} from 'react-router-dom'; 
import BookUpdateForm from './BookUpdate';
import Pagination from './Pagination';
import PageContent from './PageContent';
import PageForm from './CreatePage';
import PageUpdateForm from './PageUpdate';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import '../styles/BookDetail.css';

const BookDetail = () => {
  const { id } = useParams();
  const history = useNavigate();

  const [book, setBook] = useState(null);

  const [number, setNumber] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  const [showBook, setShowBook] = useState(false);

  const [showPage, setShowPage] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try { 
        const bookData = await getBookById(id, number);
        setBook(bookData);
        setHasNextPage(bookData.pages.next !== null);
        setHasPrevPage(bookData.pages.previous !== null);
      } catch (error) {
        console.error('Error fetching book:', error.response);
      }
    };

    fetchBook();
  }, [id, number]);


  const handlePageChange = (number) => {
    setNumber(number);
  };

  const handleBookEdit = () => {
    setShowBook(true);
  };

  const handleBookCancelEdit = () => {
    setShowBook(false);
  };

  const handleDeleteBook = async () => {
    try {
      await deleteBook(id);
      history('/');
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };


  const handleAddPage = () => {
    setShowPage(true);
  };

  const handleClosePage = () => {
    setShowPage(false);
  };

  const handlePageEdit = () => {
    setShowUpdate(true);
  };

  const handlePageCancelEdit = () => {
    setShowUpdate(false);
  };

  const handleDeletePage = async () => {
    try {
      await deletePage(book.pages.results[0].id);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting page:', error);
    }
  };


if (book) {
    return (
      <div className="container mt-4">
        <div className="details-container">
          <h1>{book.title}</h1>
          <p>Author: {book.author.username}</p>
          <p>Publication Date: {book.publication_date}</p>
          <p>Price: {book.price}</p>
          {book.author.id === getUserInfo()?.id && (
            <div className="buttons-actions">
              <button onClick={handleDeleteBook} className="btn btn-icon">
                <FaTrashAlt />
              </button>
              <button onClick={handleBookEdit} className="btn btn-icon">
                <FaEdit />
              </button>
            </div>
          )}
          {showBook && (
            <BookUpdateForm book={book} onCancel={handleBookCancelEdit} />
          )}
        </div>


        <div className="details-container">
          <PageContent page={book.pages} />

          <div className="buttons-actions">
            {book.author.id === getUserInfo()?.id && (
              <>
              {book.pages.count !== 0 && (
                <>
                  <button onClick={handleDeletePage} className="btn btn-icon">
                    <FaTrashAlt />
                  </button>
                  
                    <button onClick={handlePageEdit} className="btn btn-icon">
                      <FaEdit />
                    </button>
                </>
                )}
                <button onClick={handleAddPage} className="btn btn-icon">
                  <FaPlus />
                </button>
              </>
            )}
          </div>
          {showPage && (
            <PageForm book={book} onCancel={handleClosePage} />
          )}

          {showUpdate && (
            <PageUpdateForm
              book={book}
              onCancel={handlePageCancelEdit}
            />
          )}
        </div>

        <div className="pagination-container">
          <Pagination
            currentPage={number}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            onPageChange={handlePageChange}
            className="pagination-container"
          />
        </div>
        <div className="return-button">
          <Link to="/" className="btn btn-primary">Return to Book List</Link>
        </div>
      </div>
    );
  }
  return <div>Loading...</div>;
};

export default BookDetail;
