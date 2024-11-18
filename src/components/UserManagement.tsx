import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Hook de navegación

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

const UserManagement: React.FC = () => {
  const navigate = useNavigate(); // Inicializar el hook de navegación
  const [user, setUser] = useState<User>(
    JSON.parse(localStorage.getItem('user') || '{}')
  );
  const [editing, setEditing] = useState<boolean>(false);

  // Manejar cambios en los campos de entrada
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  // Guardar cambios en localStorage
  const handleSave = () => {
    localStorage.setItem('user', JSON.stringify(user));
    alert('User details saved!');
    setEditing(false);
  };

  // Redirigir al dashboard
  const handleBackToHome = () => {
    navigate('/protected/cocktails');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">
            <img src={user.image || '/icons/reshot-icon-profile-QX6KDSLJC5.svg'} alt="Profile Icon" />
          </div>
          <h2 className="auth-title">User Management</h2>
        </div>
        <form className="auth-form">
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              name="firstName"
              placeholder="First Name"
              value={user.firstName || ''}
              onChange={handleInputChange}
              disabled={!editing}
            />
            <label>First Name</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              name="lastName"
              placeholder="Last Name"
              value={user.lastName || ''}
              onChange={handleInputChange}
              disabled={!editing}
            />
            <label>Last Name</label>
          </div>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              value={user.email || ''}
              onChange={handleInputChange}
              disabled={!editing}
            />
            <label>Email</label>
          </div>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              name="image"
              placeholder="Profile Picture URL"
              value={user.image || ''}
              onChange={handleInputChange}
              disabled={!editing}
            />
            <label>Profile Picture URL</label>
          </div>
          <div className="text-center mt-3">
            {!editing ? (
              <button
                type="button"
                className="btn auth-button me-2"
                onClick={() => setEditing(true)}
              >
                Edit User
              </button>
            ) : (
              <button
                type="button"
                className="btn auth-button-success me-2"
                onClick={handleSave}
              >
                Save Changes
              </button>
            )}
            <button
              type="button"
              className="btn auth-button-secondary"
              onClick={handleBackToHome}
            >
              Back to Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserManagement;
