import React, { useState } from 'react';
import { login } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const history = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      const token = response.access;
      localStorage.setItem('access', token);
      history("/");

    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Failed to login. Please check your credentials.');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
