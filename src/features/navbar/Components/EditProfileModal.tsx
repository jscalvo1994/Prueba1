import React, { useState } from 'react';
import './Css/Navbar.css'
interface EditProfileModalProps {
  onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ onClose }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [name, setName] = useState(user.firstName || '');
  const [email, setEmail] = useState(user.email || '');

  const handleSave = () => {
    const updatedUser = { ...user, firstName: name, email };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>Edit Profile</h2>
        <form>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="button" className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
