import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState(''); // Estado para el nombre de usuario
  const [password, setPassword] = useState(''); // Estado para la contraseña
  const [message, setMessage] = useState<string | null>(null); // Mensaje de retroalimentación para el usuario

  const navigate = useNavigate(); // Hook de React Router para redirección

  // Maneja el evento de envío del formulario
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar las credenciales almacenadas en localStorage
    const storedUser = JSON.parse(localStorage.getItem('newUser') || '{}');
    if (storedUser.username === username && storedUser.password === password) {
      localStorage.setItem('accessToken', btoa(`${username}:${password}`));
      setMessage('Login successful! Redirecting...');
      setTimeout(() => {
        navigate('/protected/cocktails'); // Redirige al Dashboard
      }, 1000);
      return;
    }

    // Intentar autenticación con el backend
    try {
      const data = await login(username, password);
      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/protected/cocktails');
      } else {
        setMessage('Login failed. Token is missing.');
      }
    } catch (error: any) {
      setMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">
            <img src="/icons/reshot-icon-profile-QX6KDSLJC5.svg" alt="Profile Icon" />
          </div>
          <h2 className="auth-title">Welcome Back</h2>
        </div>
        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Username</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
          </div>
          <button type="submit" className="btn auth-button w-100">Login</button>
        </form>
        {message && <div className="auth-alert auth-alert-info">{message}</div>}
        <div className="text-center mt-3">
          <span className="text-muted">Don't have an account? </span>
          <span className="auth-link" onClick={() => navigate('/new-user')}>Sign up</span>
        </div>
      </div>
    </div>
  );
};


export default Login;
