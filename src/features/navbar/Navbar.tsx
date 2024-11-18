import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './Components/Search';
import './Components/Css/Navbar.css';
import Logo from './Components/Logo';
import NavLinks from './Components/NavLinks';
import UserDropdown from './Components/UserDropdown';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query); // Actualiza la consulta de búsqueda
    navigate('/protected/cocktails'); // Navega a la página de cócteles si no estás en ella
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}'); // Obtener usuario del localStorage

  function handleUserManagement(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    // Navigate to the user management page
    navigate('/user-management');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <div className="container-fluid">
        {/* Logo */}
        <Logo />

        {/* Enlaces de navegación */}
        <NavLinks />

        {/* Barra de búsqueda */}
        <SearchBar onSearch={handleSearch} />

        {/* Usuario Autenticado */}
        {user && (
          <div className="user-section">
            <img
              src={user.image}
              alt={user.username}
              className="rounded-circle user-photo"
              onClick={toggleDropdown}
            />
            <span className="user-name ms-2">{user.firstName} {user.lastName}</span>
            {/* Botón para gestionar usuario */}
            <button
              className="btn btn-outline-primary ms-3"
              onClick={handleUserManagement}
            >
              Manage User
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
