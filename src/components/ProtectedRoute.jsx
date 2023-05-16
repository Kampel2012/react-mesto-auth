import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = ({ element: Component, ...props }) => {
  const isAuth = useContext(AuthContext);

  return <>{isAuth ? <Component {...props} /> : <Navigate to="/signin" />}</>;
};

export default ProtectedRoute;
