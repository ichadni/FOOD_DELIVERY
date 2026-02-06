import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: ""
  });

  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://food-delivery-83wk.onrender.com/api/createuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.geolocation,
          role
        }),
      });

      const json = await response.json();

      if (json.success) {
        localStorage.setItem("authToken", json.authToken);
        localStorage.setItem("userEmail", credentials.email);
        localStorage.setItem("role", json.role);
        navigate("/", { replace: true });
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "#f7ffe5" }}   // light yellow-green bg
    >
      <div
        className="card shadow-sm p-4"
        style={{
          maxWidth: "420px",
          width: "100%",
          borderRadius: "14px",
          border: "none"
        }}
      >
        <h3
          className="text-center mb-1 fw-bold"
          style={{ color: "#2f7d32" }}     // deep green
        >
          Create Account
        </h3>

        <p className="text-center mb-4 text-muted" style={{ fontSize: "14px" }}>
          Join GoFood and enjoy ordering
        </p>

        {/* Role Switch */}
        <div className="d-flex mb-4 rounded overflow-hidden">
          <button
            type="button"
            className="btn w-50"
            style={{
              background: role === "user" ? "#2f7d32" : "#f1f8c8",
              color: role === "user" ? "#fff" : "#2f7d32"
            }}
            onClick={() => setRole("user")}
          >
            User
          </button>

          <button
            type="button"
            className="btn w-50"
            style={{
              background: role === "admin" ? "#2f7d32" : "#f1f8c8",
              color: role === "admin" ? "#fff" : "#2f7d32"
            }}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              required
              value={credentials.name}
              onChange={(e) =>
                setCredentials({ ...credentials, name: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email Address"
              required
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              required
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Location (optional)"
              value={credentials.geolocation}
              onChange={(e) =>
                setCredentials({ ...credentials, geolocation: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn w-100 mb-3"
            style={{
              background: "#8bc34a",   // green-yellow
              color: "#1b5e20",
              borderRadius: "8px",
              fontWeight: "600"
            }}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

          <div className="text-center">
            <span style={{ fontSize: "14px" }}>
              Already have an account?{" "}
              <span
                style={{
                  color: "#2f7d32",
                  cursor: "pointer",
                  fontWeight: "600"
                }}
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
