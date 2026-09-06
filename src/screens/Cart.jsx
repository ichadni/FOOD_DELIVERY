import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart, useDispatchCart } from "../components/ContexReducer";

export default function Cart({ onClose }) {
  const cartItems = useCart();
  const dispatch = useDispatchCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  const handleCheckout = () => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      alert("Please log in first.");
      return;
    }
    navigate("/checkout");
    onClose && onClose();
  };

  const handleClose = () => {
    onClose ? onClose() : navigate(-1);
  };

  if (cartItems.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
        <h3 className="text-warning fw-bold">Your cart is empty 🛒</h3>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "50px" }}>
    <div className="container my-4">
      <div
        className="card shadow-lg border-0 rounded-4 position-relative"
        style={{
          background: "linear-gradient(145deg, #0f5132, #198754)",
          color: "#fff",
        }}
      >
        {/* Close Button */}
        <button
          className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
          onClick={handleClose}
        />

        {/* Header */}
        <div className="text-center py-3 border-bottom border-warning">
          <h3
            className="fw-bold text-warning"
            style={{ fontFamily: "'Comic Sans MS', cursive" }}
          >
            🛒 Your Cart
          </h3>
        </div>

        {/* Table */}
        <div className="table-responsive p-3">
          <table className="table table-borderless align-middle text-center text-light">
            <thead className="text-dark" style={{ backgroundColor: "#ffc107" }}>
              <tr>
                <th>#</th>
                <th>Food</th>
                <th>Qty</th>
                <th>Size</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index} className="border-bottom border-success">
                  <td>{index + 1}</td>
                  <td className="fw-semibold">{item.name}</td>
                  <td>
                    <span className="badge bg-warning text-dark">
                      {item.qty}
                    </span>
                  </td>
                  <td>
                    <span className="badge bg-light text-success">
                      {item.size}
                    </span>
                  </td>
                  <td className="fw-bold text-warning">
                    ৳{Number(item.price)}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-light"
                      onClick={() => dispatch({ type: "REMOVE", index })}
                    >
                      ✖
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center p-4 gap-3">
          <h4 className="text-warning fw-bold">
            Total: ৳{totalPrice}
          </h4>

          <button
            className="btn btn-warning text-dark fw-semibold px-4 py-2 shadow"
            style={{
              borderRadius: "30px",
              transition: "0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onClick={handleCheckout}
          >
            Proceed to Checkout →
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}
