import React from 'react';

interface UserCardProps {
  onEdit: () => void;
  onLogout: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ onEdit, onLogout }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="user-card">
      <img
        src={user.image}
        alt={user.username}
        className="rounded-circle"
      />
      <h5>{user.firstName} {user.lastName}</h5>
      <p>{user.email}</p>
      <button className="btn btn-primary mb-2" onClick={onEdit}>
        Edit User
      </button>
      <button className="btn btn-secondary" onClick={onLogout}>
        Log Out
      </button>
    </div>
  );
};

export default UserCard;
