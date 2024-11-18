import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../Components/Css/NavLinks.css';
import './Css/NavLinks.css';
const NavLinks: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      {/* Página principal (Dashboard) */}
      <li className="nav-item">
        <NavLink
          to="protected/cocktails"
          className={({ isActive }) =>
            `nav-link ${isActive ? 'active text-primary fw-bold' : ''}`
          }
        >
        <i className="bi bi-house-door-fill"></i>
        </NavLink>
      </li>

      {/* Listado de cócteles populares */}
      <li className="nav-item">
        <NavLink
          to="/protected/populars"
          className={({ isActive }) =>
            `nav-link ${isActive ? 'active text-primary fw-bold' : ''}`
          }
        >
          Popular Cocktails
        </NavLink>
      </li>

      {/* Listado de ingredientes */}
      <li className="nav-item">
        <NavLink
          to="/protected/ingredients"
          className={({ isActive }) =>
            `nav-link ${isActive ? 'active text-primary fw-bold' : ''}`
          }
        >
          Ingredients
        </NavLink>
      </li>

      {/* Filtros generales con submenú */}
      <li className={`nav-item dropdown ${isOpen ? 'show' : ''}`}>
        <button
          className="nav-link dropdown-toggle"
          onClick={toggleSubMenu}
          aria-expanded={isOpen}
        >
          Filters
        </button>
        <ul className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
          <li>
            <NavLink
              to="/protected/filters/type"
              className={({ isActive }) =>
                `dropdown-item ${isActive ? 'active text-primary fw-bold' : ''}`
              }
            >
              By Type
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/protected/filters/category"
              className={({ isActive }) =>
                `dropdown-item ${isActive ? 'active text-primary fw-bold' : ''}`
              }
            >
              By Category
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/protected/filters/ingredient"
              className={({ isActive }) =>
                `dropdown-item ${isActive ? 'active text-primary fw-bold' : ''}`
              }
            >
              By Ingredient
            </NavLink>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default NavLinks;
