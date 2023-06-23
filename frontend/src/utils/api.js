import axios from 'axios';

export const BASE_URL = 'http://127.0.0.1:8000';
export const API_BASE_URL = 'http://127.0.0.1:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
});


// Function to set the JWT token in the request headers
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
    setAuthToken(token); // Set the token in the request headers
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to get a book Details
export const getBookById = async (bookId) => {
  try {
    const response = await api.get(`/books/${bookId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching book');
  }
};

// Function to make an API request to get the list of books
export const getBooks = async (page = 1) => {
  try {
    const response = await api.get(`/books?page=${page}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to make an API request to get the author's books
export const getAuthorBooks = async (authorId) => {
  try {
    const response = await api.get('/books/mine');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to make an API request to get the author's pages
export const getAuthorPages = async (authorId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/pages/mine`);
    return response.data;
  } catch (error) {
    throw error;
  }
};