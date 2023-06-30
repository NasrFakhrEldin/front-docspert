import React, { useState } from 'react';
import { updateBook } from '../utils/api';

const BookUpdateForm = ({ book, onCancel }) => {
  const [formData, setFormData] = useState({
    title: book.title,
    publication_date: book.publication_date,
    price: book.price,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBook(book.id, formData);
      window.location.reload();
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h3 className="card-title">Update Book</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="publication_date" className="form-label">Publication Date</label>
            <input
              type="date"
              className="form-control"
              id="publication_date"
              name="publication_date"
              value={formData.publication_date}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">Price</label>
            <input
              type="text"
              className="form-control"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">Update</button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookUpdateForm;
