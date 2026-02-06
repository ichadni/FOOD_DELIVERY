import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://food-delivery-83wk.onrender.com/api/loginuser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
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
      alert('Something went wrong. Try again.');
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #e8fff1, #f7f7f7)"
      }}
    >
      <div
        className="card border-0 shadow-lg p-4"
        style={{
          width: "380px",
          borderRadius: "18px"
        }}
      >
        {/* Brand */}
        <h3
          className="text-center mb-1 fw-bold text-success"
          style={{ fontFamily: "'Comic Sans MS', cursive" }}
        >
          ☕ GoFood
        </h3>
        <p className="text-center text-muted mb-4">
          Welcome back! Please login
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label fw-semibold text-muted">
              Email
            </label>
            <div className="input-group">
              <span className="input-group-text bg-success text-white">
                <i className="bi bi-envelope-fill"></i>
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="you@example.com"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="form-label fw-semibold text-muted">
              Password
            </label>
            <div className="input-group">
              <span className="input-group-text bg-success text-white">
                <i className="bi bi-lock-fill"></i>
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="••••••••"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn btn-success w-100 fw-semibold py-2"
            style={{
              borderRadius: "999px",
              transition: "0.3s"
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          >
            <i className="bi bi-box-arrow-in-right me-2"></i>
            Login
          </button>

          {/* Signup */}
          <div className="text-center mt-4">
            <span className="text-muted">Don’t have an account?</span>
            <Link
              to="/createuser"
              className="btn btn-warning btn-sm ms-2 fw-semibold"
              style={{ borderRadius: "999px" }}
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
