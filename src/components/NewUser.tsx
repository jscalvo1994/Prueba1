import React, { useState } from 'react';
import { createUser } from '../services/apICRUDusers';
import { fillDefaultValues, User } from '../services/apiClient'; // Asegúrate de que está correctamente importado
import { useNavigate } from 'react-router-dom';
import './NewUser.css';

const NewUser: React.FC = () => {
    const [formData, setFormData] = useState<Partial<User>>(
      fillDefaultValues({
        username: '',
        password: '',
        email: '',
      })
    );
    const [message, setMessage] = useState<string | null>(null);
    const navigate = useNavigate();
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
        try {
          // Asegúrate de que formData tenga la estructura correcta
          const newUser = await createUser(formData);
      
          if (!newUser || !newUser.id) {
            throw new Error('Invalid user data returned from API.');
          }
      
          // Guardar el usuario en localStorage
          localStorage.setItem('newUser', JSON.stringify(newUser));
      
          setMessage('User created successfully! Please login with your new account.');
      
          // Redirige al login después de un tiempo
          setTimeout(() => {
            navigate('/'); // Redirige al login
          }, 2000);
        } catch (error) {
          console.error('Error creating user:', error);
          setMessage('Error creating user. Please try again.');
        }
      };


 
      return (
        <div className="new-user-wrapper">
          <div className="card new-user-card">
            <div className="card-body">
              <div className="new-user-header">
                <div className="profile-icon">
                  <img
                    src="/icons/reshot-icon-profile-QX6KDSLJC5.svg"
                    alt="Profile Icon"
                    className="profile-image"
                  />
                </div>
                <h2>Create New Account</h2>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="username">Username</label>
                </div>
                <div className="form-floating">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Create User
                </button>
              </form>
              <div className="text-center mt-3">
                <span className="text-muted">Already have an account? </span>
                <span className="back-to-login" onClick={() => navigate('/')}>
                  Back to Login
                </span>
              </div>
              {message && <div className="alert alert-info mt-3">{message}</div>}
            </div>
          </div>
        </div>
      );
    };
    
    export default NewUser;