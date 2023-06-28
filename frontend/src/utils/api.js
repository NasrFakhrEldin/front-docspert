import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const BASE_URL = 'http://127.0.0.1:8000';
export const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
});


const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `JWT ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/token/`, { username, password });
    const { token } = response.data;
    setAuthToken(token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('access');
};

export const isAuthenticated = () => {
    const token = localStorage.getItem('access');
    return !!token;
  };

export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};


export const getUserInfo = () => {
  const token = localStorage.getItem('access');
  if (token) {
    const decodedToken = decodeToken(token);
    if (decodedToken) {
      return {
        username: decodedToken.username,
        id: decodedToken.id,
        // image: decodedToken.image,
      };
    }
  }
  return null;
};

  export const getBookById = async (bookId, number) => {
  try {
    const response = await api.get(`/books/${bookId}?number=${number}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching book');
  }
};


export const getBooks = async (page = 1) => {
  try {
    const response = await api.get(`/books?page=${page}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getAuthorBooks = async (authorId) => {
  try {
    const response = await api.get('/books/mine');
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getAuthorPages = async (authorId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/pages/mine`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const createBook = async (bookData) => {
  try {
    const token = localStorage.getItem('access');
    setAuthToken(token);
    const response = await api.post('/books/', bookData);
    return response.data;
  } catch (error) {
    throw error;
  }
};