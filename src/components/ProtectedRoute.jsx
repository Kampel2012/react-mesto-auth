import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, isAuth, ...props }) => {
  return <>{isAuth ? <Component {...props} /> : <Navigate to="/signin" />}</>;
};

export default ProtectedRoute;
