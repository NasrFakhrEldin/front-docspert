import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookList from './components/BookList';
import BookDetail from './components/BookDetails';
import NavBar from './components/NavBar';
import Login from './components/Login';
import CreateBook from './components/CreateBook';
import MyBooks from './components/MyBooks';


const App = () => {
  return (
    <Router>
      <NavBar />
      <div className="container mt-4">
      <Routes>
        <Route path="/" element={<BookList/>} />
        <Route path="/mine" element={<MyBooks/>} />
        <Route path="/books/:id" element={<BookDetail/>} />
        <Route path="/create-book" element={<CreateBook/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
      </div>
    </Router>
  );
};

export default App;
