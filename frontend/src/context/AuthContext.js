import React, { createContext, useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsAuthenticated(true);
      // Optionally fetch user data here
    }
  };

  const login = async (credentials) => {
    const response = await axios.post('/login', credentials);
    localStorage.setItem('token', response.data.token);
    setIsAuthenticated(true);
  };

  const signup = async (data) => {
    const response = await axios.post('/signup', data);
    localStorage.setItem('token', response.data.token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, signup, logout, checkAuthStatus }}
    >
      {children}
    </AuthContext.Provider>
  );
};
