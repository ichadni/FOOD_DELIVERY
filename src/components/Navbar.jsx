import React, { useState, useEffect } from 'react'
import Badge from 'react-bootstrap/Badge';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContexReducer';



export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  let data = useCart();
  const [pendingCount, setPendingCount] = useState(0);
  const role = localStorage.getItem("role");

  // fetch pending orders count for admin
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

  // Call once on mount and refresh every 10s
  useEffect(() => {
    fetchPendingCount();
    const interval = setInterval(fetchPendingCount, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>

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

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link className="nav-link active fs-5 " to="/">Home</Link>
            </li>
            {localStorage.getItem("authToken") && localStorage.getItem("role") !== 'admin' && (
              <li className="nav-item">
                <Link className="nav-link active fs-5" to="/myorder">MyOrders</Link>
              </li>
            )}



          </ul>
          {(!localStorage.getItem("authToken")) ?
            <div>
              <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
              <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
            </div>
            :
            <div>
              {localStorage.getItem("role") !== 'admin' ? (
                <div className='btn bg-white text-success mx-2' onClick={() => { setCartView(true) }}>
                  My Cart{" "}
                  <Badge pill bg="danger" style={{ marginLeft: "3px" }}>{data.length}</Badge>
                </div>
              ) : (
                <button className='btn bg-warning text-dark mx-2' onClick={() => window.location.href = "/add-food"}>
                  Add Food-Items
                </button>
              )}
              {role === "admin" && (
                <button
                  type="button"
                  className="btn btn-warning position-relative mx-2 rounded-circle shadow-sm"
                  style={{ width: "42px", height: "42px" }}
                  onClick={() => navigate("/admin")}
                >
                  <i className="bi bi-bell-fill fs-5 text-white"></i> {/* Bell in white */}
                  {pendingCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {pendingCount}
                      <span className="visually-hidden">pending orders</span>
                    </span>
                  )}
                </button>
              )}





              {cartView ? <Modal onClose={() => { setCartView(false) }}><Cart /></Modal> : null}
              <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
                Logout
              </div>
            </div>}


        </div>
      </div>
    </nav>
  )
}
