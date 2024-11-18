import React, { useState } from 'react';
import UserCard from './UserCard';
import EditProfileModal from './EditProfileModal';

const UserDropdown: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    window.location.href = '/';
  };

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div className="dropdown-menu dropdown-menu-end show">
      {!isEditing ? (
        <UserCard onEdit={toggleEdit} onLogout={handleLogout} />
      ) : (
        <EditProfileModal onClose={toggleEdit} />
      )}
    </div>
  );
};

export default UserDropdown;
