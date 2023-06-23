import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookList from './components/BookList';
import BookDetail from './components/BookDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookList/>} />
        <Route path="/books/:id" element={<BookDetail/>} />
      </Routes>
    </Router>
  );
};

export default App;
