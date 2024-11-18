import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';
import  './Login.css'; 
import { Link } from 'react-router-dom';
const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const navigate = useNavigate(); // Declara el hook aquí

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Obtener usuario almacenado en localStorage
    const storedUser = JSON.parse(localStorage.getItem('newUser') || '{}');

    // Validar las credenciales en localStorage
    if (storedUser.username === username && storedUser.password === password) {
      localStorage.setItem('accessToken', btoa(`${username}:${password}`));
      setMessage('Login successful! Redirecting...');
      setTimeout(() => {
        navigate('/protected/cocktails'); // Redirige al dashboard
      }, 1000);
      return (<h1>Hola autenticado con localStorage</h1>);
    }

    // Si no se encuentra en localStorage, intentar con el backend
    try {
      const data = await login(username, password);
      setMessage(`Login successful! Welcome ${data.username}`);
      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/protected/cocktails'); ; // Redirige al dashboard
      } else {
        setMessage('Login failed. Token is missing.');
      }
    } catch (error: any) {
      setMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center vh-100">
      <div className="card login-card">
        <div className="card-body">
          <div className="text-center mb-4">
            <div className="profile-icon mx-auto">
              <img
                src="/icons/reshot-icon-profile-QX6KDSLJC5.svg"
                alt="Profile Icon"
                className="profile-image"
              />
            </div>
            <h2 className="fw-bold mb-2">Welcome</h2>
            <p className="text-muted">Please log in to your account</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="d-flex justify-content-between mb-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberMe"
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              <a className="small text-muted" href="#!">
                Forgot Password?
              </a>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
            {message && (
              <div className="alert alert-danger mt-3 text-center">{message}</div>
            )}
          </form>
          <div className="text-center">
            <p className="text-muted">Don't have an account?</p>
            <Link to="/new-user" className="text-primary">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
