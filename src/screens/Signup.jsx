import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/createuser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.geolocation
        }),
      });

      const json = await response.json();

      if (json.success) {
        localStorage.setItem("userEmail", credentials.email);
        alert('Account created successfully!');
        navigate('/');
      } else {
        alert('Enter valid credentials.');
      }
    } catch (error) {
      console.error('Signup Error:', error);
      alert('Something went wrong. Try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%", borderRadius: "10px" }}>
        <h3 className="text-center mb-4">Create Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={credentials.name}
              onChange={(e) => setCredentials({ ...credentials, name: e.target.value })}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Geolocation</label>
            <input
              type="text"
              className="form-control"
              value={credentials.geolocation}
              onChange={(e) => setCredentials({ ...credentials, geolocation: e.target.value })}
              placeholder="Enter your location"
            />
          </div>

          <button type="submit" className="btn btn-success w-100 mb-2">Sign Up</button>
          <button
            type="button"
            className="btn btn-outline-secondary w-100"
            onClick={() => navigate('/login')}
          >
            Already have an account? Login
          </button>
        </form>
      </div>
    </div>
  );
}
