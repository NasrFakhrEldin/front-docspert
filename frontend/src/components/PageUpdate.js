import React, { useState } from 'react';
import { updatePage } from '../utils/api';

const PageUpdateForm = ({ book, onCancel }) => {
  const [formData, setFormData] = useState({
    book: book.id,
    number: book.pages.results[0].number,
    content: book.pages.results[0].content
  });
  console.log("book:", book)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePage(book.pages.results[0].id, formData);
      window.location.reload();
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h3 className="card-title">Update Page</h3>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label htmlFor="content" className="form-label">Page Content</label>
                <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    className="form-control"
                    rows="3"
                    required
                ></textarea>
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

export default PageUpdateForm;
