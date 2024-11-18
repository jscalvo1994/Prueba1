import React, { useState } from 'react';
import { createUser } from '../services/apICRUDusers';
import { useNavigate } from 'react-router-dom';

const NewUser: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newUser = await createUser(formData);
      localStorage.setItem('newUser', JSON.stringify(newUser));
      setMessage('Account created! Redirecting to login...');
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      setMessage('Error creating account. Please try again.');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">
            <img src="/icons/reshot-icon-profile-QX6KDSLJC5.svg" alt="Profile Icon" />
          </div>
          <h2 className="auth-title">Create an Account</h2>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <label>Username</label>
          </div>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label>Email</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label>Password</label>
          </div>
          <button type="submit" className="btn auth-button w-100">Sign Up</button>
        </form>
        {message && <div className="auth-alert auth-alert-info">{message}</div>}
        <div className="text-center mt-3">
          <span className="text-muted">Already have an account? </span>
          <span className="auth-link" onClick={() => navigate('/')}>Login</span>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
