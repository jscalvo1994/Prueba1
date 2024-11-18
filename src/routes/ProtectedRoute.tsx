import React from 'react';
import { Navigate, Outlet } from '@tanstack/react-router';

const ProtectedRoute = () => {
  const token = localStorage.getItem('accessToken');
  console.log('Token in ProtectedRoute:', token); // Agrega un log para verificar el token

  if (!token) {
    console.log('No token found, redirecting to login');
    return <Navigate to="/" />;
  }

  console.log('Token found, rendering protected route');
  return <Outlet />;
};

export default ProtectedRoute;
