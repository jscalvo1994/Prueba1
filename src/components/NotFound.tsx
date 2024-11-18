import React from 'react';
import { useNavigate } from '@tanstack/react-router'; // Para redirigir

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate({ to: '/' }); // Redirige a la página de login
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button
        onClick={handleGoHome}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Go to Login
      </button>
    </div>
  );
};

export default NotFound;
