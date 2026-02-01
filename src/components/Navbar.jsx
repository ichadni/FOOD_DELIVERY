import React, { useState, useEffect } from "react";
import Badge from "react-bootstrap/Badge";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContexReducer";

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const cartItems = useCart();
  const [pendingCount, setPendingCount] = useState(0);

  const authToken = localStorage.getItem("authToken");
  const role = localStorage.getItem("role");

  // ===== Fetch pending orders (ADMIN) =====
  const fetchPendingCount = async () => {
    if (role === "admin") {
      try {
        const res = await fetch("http://localhost:5000/api/pending-count");
        const data = await res.json();
        setPendingCount(data.count);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchPendingCount();
    const interval = setInterval(fetchPendingCount, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success py-1 shadow-sm sticky-top">
        <div className="container-fluid">

          {/* LEFT : Brand + Home */}
          <div className="d-flex align-items-center gap-2">
            <Link
              className="navbar-brand fs-4 fst-italic fw-bold text-warning d-flex align-items-center"
              to="/"
              style={{ fontFamily: "'Comic Sans MS', cursive" }}
            >
              <i className="bi bi-cup-hot-fill me-1"></i> GoFood
            </Link>

            <Link
              to="/"
              className="btn btn-sm btn-warning shadow-sm d-flex align-items-center"
            >
              <i className="bi bi-house-fill me-1"></i> Home
            </Link>
          </div>

          {/* TOGGLER */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* RIGHT SIDE */}
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <div className="d-flex align-items-center gap-2">

              {/* ================= BEFORE LOGIN ================= */}
              {!authToken && (
                <>
                  {/* LOGIN */}
                  <Link
                    to="/login"
                    className="btn btn-sm d-flex align-items-center fw-semibold shadow-sm"
                    style={{
                      background: "linear-gradient(135deg, #ffffff, #e9ffe9)",
                      color: "#198754",
                      borderRadius: "999px",
                      padding: "6px 14px",
                      transition: "all 0.25s ease"
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = "scale(1.08)";
                      e.currentTarget.style.boxShadow = "0 0 10px rgba(25,135,84,0.6)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <i className="bi bi-box-arrow-in-right me-1"></i> Login
                  </Link>

                  {/* SIGN UP */}
                  <Link
                    to="/createuser"
                    className="btn btn-sm d-flex align-items-center fw-semibold shadow-sm"
                    style={{
                      background: "linear-gradient(135deg, #ffc107, #ffdd55)",
                      color: "#14532d",
                      borderRadius: "999px",
                      padding: "6px 16px",
                      transition: "all 0.25s ease"
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = "scale(1.08)";
                      e.currentTarget.style.boxShadow = "0 0 12px rgba(255,193,7,0.8)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <i className="bi bi-person-plus-fill me-1"></i> Sign Up
                  </Link>
                </>
              )}


              {/* ================= USER ================= */}
              {authToken && role !== "admin" && (
                <>
                  <Link
                    to="/myorder"
                    className="btn btn-sm btn-warning shadow-sm d-flex align-items-center"
                    style={{ color: "green" }}
                  >
                    <i className="bi bi-bag-fill me-1"></i> MyOrders
                  </Link>

                  <button
                    className="btn btn-sm bg-white text-success shadow-sm position-relative"
                    onClick={() => setCartView(true)}
                  >
                    <i className="bi bi-cart-fill me-1"></i> Cart
                    <Badge pill bg="danger" className="ms-1">
                      {cartItems.length}
                    </Badge>
                  </button>
                </>
              )}

              {/* ================= ADMIN ================= */}
              {authToken && role === "admin" && (
                <>
                  <button
                    className="btn btn-sm btn-warning text-dark shadow-sm"
                    onClick={() => navigate("/add-food")}
                  >
                    Add Food
                  </button>

                  <button
                    className="btn btn-sm btn-warning position-relative rounded-circle shadow-sm"
                    style={{ width: "36px", height: "36px", padding: 0 }}
                    onClick={() => navigate("/admin")}
                  >
                    <i className="bi bi-bell-fill text-white"></i>
                    {pendingCount > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {pendingCount}
                      </span>
                    )}
                  </button>
                </>
              )}

              {/* ================= LOGOUT ================= */}
              {authToken && (
                <button
                  className="btn btn-sm bg-white text-danger shadow-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}

            </div>
          </div>
        </div>
      </nav>

      {/* ================= CART MODAL ================= */}
      {cartView && (
        <Modal onClose={() => setCartView(false)}>
          <Cart />
        </Modal>
      )}
    </>
  );
}
