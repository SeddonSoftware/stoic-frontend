import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }:any) => {
    const {isLoggedIn} = useAuth();

  if (!isLoggedIn) {
    // User not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;