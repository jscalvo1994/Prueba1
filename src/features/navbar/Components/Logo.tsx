import React from 'react';
import { Link } from 'react-router-dom';
import './Css/Logo.css';

const Logo: React.FC = () => {
  return (
    <div className="logo d-flex align-items-center gap-2">
      <Link to="protected/cocktails" className="d-flex align-items-center gap-2 text-decoration-none">
        <i className="bi bi-cup-straw fs-3 text-primary"></i> {/* Ícono de cóctel */}
        <h1 className="fs-4 m-0 text-primary">MyCocktailApp</h1> {/* Nombre de la aplicación */}
      </Link>
    </div>
  );
};

export default Logo;