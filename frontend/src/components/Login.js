import React, { useState } from 'react';
import { login } from '../utils/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password); // Call the login API function
      const token = response.token; // Extract the token from the API response
      // Store the token in localStorage or in a state management library (e.g., Redux)
      // Redirect the user or update the UI accordingly
    } catch (error) {
      console.error('Login failed:', error);
      // Display an error message or update the UI to handle failed login attempts
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
