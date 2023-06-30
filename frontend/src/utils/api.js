import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const BASE_URL = 'http://127.0.0.1:8000/api';
export const API_VERSION = '/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');
  if (token) {
    config.headers['Authorization'] = `JWT ${token}`;
  }
  return config;
});

const refreshToken = async () => {
  try {
    const refresh = localStorage.getItem('refresh');
    if (refresh) {
      const response = await api.post(`${BASE_URL}/token/refresh/`, { refresh });
      const { access } = response.data;
      localStorage.setItem('access', access);
      return access;
    }
    throw new Error('No refresh token found');
  } catch (error) {
    throw error;
  }
};

const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp && decoded.exp < currentTime) {
      return null;
    }
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const isAuthenticated = async () => {
  const token = localStorage.getItem('access');
  if (token) {
    const decodedToken = decodeToken(token);
    if (decodedToken) {
      if (decodedToken.exp && decodedToken.exp < Date.now() / 1000) {
        // Token has expired, refresh it
        try {
          await refreshToken();
          return true;
        } catch (error) {
          console.error('Error refreshing token:', error);
          return false;
        }
      }
      return true;
    }
  }
  return false;
};


export const login = async (username, password) => {
  try {
    const response = await api.post(`${BASE_URL}/token/`, { username, password });
    const { access, refresh } = response.data;
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
};

export const getUserInfo = () => {
  const token = localStorage.getItem('access');
  if (token) {
    const decodedToken = decodeToken(token);
    if (decodedToken) {
      return {
        username: decodedToken.username,
        id: decodedToken.user_id,
        // image: decodedToken.image,
      };
    }
  }
  return null;
};

export const getBookById = async (bookId, number) => {
  try {
    const response = await api.get(`${API_VERSION}/books/${bookId}/?pn=${number}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching book');
  }
};


export const getBooks = async (page = 1) => {
  try {
    const response = await api.get(`${API_VERSION}/books?page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching books');;
  }
};


export const getAuthorBooks = async (authorId) => {
  try {
    const authenticated  = await isAuthenticated();
    if (authenticated ) {
      const response = await api.get(`${API_VERSION}/books/mine`);
      return response.data;
    }
    throw new Error('User is not authenticated');
  } catch (error) {
    throw error;
  }
};


export const createBook = async (bookData) => {
  try {
    const authenticated  = await isAuthenticated();
    if (authenticated ) {
      const response = await api.post(`${API_VERSION}/books/`, bookData);
      return response.data;
    }
    throw new Error('User is not authenticated');
  } catch (error) {
    throw new Error('Error creating book');
  }
};

export const updateBook = async (bookId, formData) => {
  try {
    const authenticated  = await isAuthenticated();
    if (authenticated ) {
      const response = await api.put(`${API_VERSION}/books/${bookId}/`, formData);
      return response.data;
    }
    throw new Error('User is not authenticated');
  } catch (error) {
    console.log("ERROR:",error.response.data)
    throw new Error('Error updating book');
  }
};

export const deleteBook = async (bookId) => {
  try {
    const authenticated  = await isAuthenticated();
    if (authenticated ) {
      const response = await api.delete(`${API_VERSION}/books/${bookId}`);
      return response.data;
    }
    throw new Error('User is not authenticated');
  } catch (error) {
    throw new Error('Error deleting book');
  }
};


export const createPage = async (pageData) => {
  try {
    const authenticated  = await isAuthenticated();
    console.log("Auth?", authenticated)
    if (authenticated ) {
      const response = await api.post(`${API_VERSION}/pages/`, pageData);
      return response.data;
    }
    throw new Error('User is not authenticated');
  } catch (error) {
    throw new Error('Error creating page');
  }
};

export const updatePage = async (pageId, pageData) => {
  try {
    const authenticated  = await isAuthenticated();
    if (authenticated ) {
      const response = await api.put(`${API_VERSION}/pages/${pageId}/`, pageData);
      return response.data;
    }
    throw new Error('User is not authenticated');
  } catch (error) {
    throw error;
  }
};

export const deletePage = async (PageId) => {
  try {
    const authenticated  = await isAuthenticated();
    if (authenticated ) {
      const response = await api.delete(`${API_VERSION}/pages/${PageId}`);
      return response.data;
    }
    throw new Error('User is not authenticated');
  } catch (error) {
    throw new Error('Error deleting page');
  }
};

isAuthenticated();