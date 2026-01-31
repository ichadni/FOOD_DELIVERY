import React, { useState, useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContexReducer';

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const cartItems = useCart();
  const [pendingCount, setPendingCount] = useState(0);
  const role = localStorage.getItem("role");

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
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success py-1 shadow-sm sticky-top">
      <div className="container-fluid">

        {/* Left: GoFood Brand + Home Icon */}
        <div className="d-flex align-items-center">
          {/* GoFood Brand */}
          <Link
            className="navbar-brand fs-4 fst-italic fw-bold text-warning d-flex align-items-center me-3"
            to="/"
            style={{ fontFamily: "'Comic Sans MS', cursive" }}
          >
            <i className="bi bi-cup-hot-fill me-1"></i> GoFood
          </Link>

          {/* Home Icon */}
          <Link
            className="btn btn-sm btn-warning d-flex align-items-center shadow-sm"
            to="/"
          >
            <i className="bi bi-house-fill me-1"></i> Home
          </Link>
        </div>

        {/* Navbar Toggler for small screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Right Side Buttons */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <div className="d-flex align-items-center gap-2">

            {/* MyOrders for Users */}
            {localStorage.getItem("authToken") && role !== 'admin' && (
              <Link
                className="btn btn-sm btn-warning d-flex align-items-center shadow-sm"
                to="/myorder"
                style={{ color: "green" }}
              >
                <i className="bi bi-bag-fill me-1"></i> MyOrders
              </Link>
            )}

            {/* Cart for Users */}
            {role !== 'admin' && localStorage.getItem("authToken") && (
              <div
                className="btn btn-sm bg-white text-success shadow-sm position-relative"
                onClick={() => setCartView(true)}
              >
                <i className="bi bi-cart-fill me-1"></i> Cart
                <Badge pill bg="danger" style={{ marginLeft: "3px" }}>{cartItems.length}</Badge>
              </div>
            )}

            {/* Admin Buttons */}
            {role === 'admin' && (
              <>
                <button
                  className="btn btn-sm bg-warning text-dark shadow-sm"
                  onClick={() => navigate("/add-food")}
                >
                  Add Food-Items
                </button>

                <button
                  type="button"
                  className="btn btn-sm btn-warning position-relative rounded-circle shadow-sm"
                  style={{ width: "36px", height: "36px", padding: 0 }}
                  onClick={() => navigate("/admin")}
                >
                  <i className="bi bi-bell-fill fs-6 text-white"></i>
                  {pendingCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {pendingCount}
                      <span className="visually-hidden">pending orders</span>
                    </span>
                  )}
                </button>
              </>
            )}

            {cartView && <Modal onClose={() => setCartView(false)}><Cart /></Modal>}

            {/* Logout */}
            {localStorage.getItem("authToken") && (
              <div
                className='btn btn-sm bg-white text-danger shadow-sm'
                onClick={handleLogout}
              >
                Logout
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
