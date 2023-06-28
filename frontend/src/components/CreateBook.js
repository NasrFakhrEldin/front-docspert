import React, { useState, useEffect } from 'react';
import { createBook, isAuthenticated } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [price, setPrice] = useState('');
  const history = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      history('/login');
    }
  }, [history]);

  const handleCreateBook = async (e) => {
    e.preventDefault();
    try {
      // Format the publication date as YYYY-MM-DD
      const formattedDate = publicationDate.split('-').map((part) => parseInt(part)).join('-');

      await createBook({ title, publication_date: formattedDate, price });
      toast.success("Created!!")

      setTitle('');
      setPublicationDate('');
      setPrice('');
    } catch (error) {
      console.error('Failed to create book:', error.response.data);
      toast.error('Please enter valid data.');
    }
  };

  return (
    <div className="container">
      <h2>Create Book</h2>
      <form onSubmit={handleCreateBook}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Publication Date</label>
          <input
            type="date"
            className="form-control"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateBook;
