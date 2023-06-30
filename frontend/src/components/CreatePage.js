import React, { useState } from 'react';
import { createPage } from '../utils/api';


const PageForm = ({ book, onCancel }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {

          let number = book.pages.count + 1
          const pageData = {
            book: book.id,
            number: number,
            content,
          };
          console.log("data:", pageData)

          await createPage(pageData);
          window.location.reload();

      } catch (error) {
        console.error('Failed to create page:', error.response);
      }
  };

  const handleClose = () => {
    onCancel();
  };

  return (
    <div className="card mt-4">
        <div className="card-body">
        <h3 className="card-title">Add Page</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                <label htmlFor="content" className="form-label">Page Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="form-control"
                        rows="3"
                        required
                    ></textarea>
                </div>
                <div className="d-flex justify-content-between">
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" className="btn btn-secondary" onClick={handleClose}>Cancel</button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default PageForm;
