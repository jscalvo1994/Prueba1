import React, { useState } from 'react';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

const UserManagement: React.FC = () => {
  const [user, setUser] = useState<User>(
    JSON.parse(localStorage.getItem('user') || '{}')
  );
  const [editing, setEditing] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem('user', JSON.stringify(user));
    alert('User details saved!');
    setEditing(false);
  };

  return (
    <div className="container mt-4">
      <h1>User Management</h1>
      <div className="card p-4">
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={user.firstName || ''}
            onChange={handleInputChange}
            disabled={!editing}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={user.lastName || ''}
            onChange={handleInputChange}
            disabled={!editing}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={user.email || ''}
            onChange={handleInputChange}
            disabled={!editing}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Profile Picture</label>
          <input
            type="text"
            className="form-control"
            name="image"
            value={user.image || ''}
            onChange={handleInputChange}
            disabled={!editing}
          />
        </div>
        <img src={user.image} alt="Profile" className="rounded-circle mb-3" width="100" />
        {!editing ? (
          <button className="btn btn-primary" onClick={() => setEditing(true)}>
            Edit User
          </button>
        ) : (
          <button className="btn btn-success" onClick={handleSave}>
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
