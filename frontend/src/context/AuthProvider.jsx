// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import axiosClient from '../axios-client';
import { toast } from 'react-toastify';
import Login from '../views/auth/Login';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

  const isAuthenticated = !!user;

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    await axiosClient
      .get("/user/")
      .then(({ data }) => {
        setUser(data);
      })
      .catch((error) => {
        toast("Usuário não autorizado, realize o login para continuar.");
      })
  }

  const login = (userData, token) => {
    setToken(token);
    setUser(userData);
  };

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  };

  const logout = () => {
    axiosClient.post("/logout").then(() => {
      setUser(null);
      setToken(null);
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};