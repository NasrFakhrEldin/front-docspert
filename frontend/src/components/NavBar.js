import React from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { isAuthenticated, getUserInfo, logout } from '../utils/api';

const NavBar = () => {
  const history = useNavigate();
  const user = getUserInfo();

  const handleLogout = () => {
    logout();
    history('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">Book Author</Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">Book List</Link>
            </li>
            <li className="nav-item">
              <Link to="/create-book" className="nav-link">Create Book</Link>
            </li>
          </ul>
        </div>

        <div className='nav justify-content-end'>
            <ul className="navbar-nav ml-auto">
            { isAuthenticated() && user ? (
              <>
              <li className="nav-item">
                <Link to="/mine" className="nav-link">My Books</Link>
              </li>
                <li className="nav-item">
                    <span className="nav-link">Welcome, {user.username}</span>
                </li>
                <li className="nav-item">
                    <button className="nav-link" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
              </>
            )}
            </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
