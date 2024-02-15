import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }:any) => {
    const {isLoggedIn, setIsLoggedIn, login} = useAuth();

  if (!isLoggedIn) {
    // User not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;