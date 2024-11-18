import React from 'react';
import './Css/Navbar.css'
const ProfileImage = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <img
      src={imageUrl}
      alt="Profile"
      className="rounded-circle"
      style={{ width: '40px', height: '40px' }}
    />
  );
};

export default ProfileImage;
