import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/loginuser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();
      if (json.success) {
        localStorage.setItem('authToken', json.authToken);
        localStorage.setItem('userEmail', credentials.email);
        localStorage.setItem('role', json.role);  
        navigate('/', { replace: true });
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('Something went wrong. Try again.');
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh', backgroundColor: '#f7f7f7' }}
    >
      <div className="card shadow p-4" style={{ width: '400px', borderRadius: '10px' }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100 mb-3">
            Login
          </button>

          <div className="text-center">
            <span>Don't have an account? </span>
            <Link to="/createuser" className="btn btn-outline-primary btn-sm ms-2">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
