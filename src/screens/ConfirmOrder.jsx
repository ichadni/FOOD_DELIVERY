import React from "react";
import { useCart, useDispatchCart } from "../components/ContexReducer";
import { useNavigate } from "react-router-dom";

export default function ConfirmOrder() {
  const navigate = useNavigate();
  const cartItems = useCart();
  const dispatch = useDispatchCart();
  const deliveryDetails = JSON.parse(localStorage.getItem("deliveryDetails"));

  const totalPrice = cartItems.reduce((sum, item) => sum + Number(item.price), 0);

  const handleConfirm = async () => {
    const userEmail = localStorage.getItem("userEmail");

    try {
      const response = await fetch("https://food-delivery-83wk.onrender.com/api/orderdata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          order_data: cartItems.map(item => ({
            id: item.id,
            name: item.name,
            qty: Number(item.qty),
            size: item.size || "Half",
            price: Number(item.price),
            img: item.img
          })),
          deliveryDetails,
          order_date: new Date().toISOString()
        })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        dispatch({ type: "DROP" });
        localStorage.removeItem("deliveryDetails");
        alert("🎉 Order confirmed successfully!");
        navigate("/");
      } else {
        alert("⚠️ Order failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Server error. Try again later.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card bg-dark text-light shadow-lg rounded-4 p-4 w-100 position-relative"
        style={{ maxWidth: "520px", border: "2px solid #28a745" }}
      >
        {/* Cross Button */}
        <button
          type="button"
          className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
          aria-label="Close"
          onClick={() => navigate(-1)}
        ></button>

        <h3
          className="text-success text-center mb-4"
          style={{ fontFamily: "'Comic Sans MS', cursive" }}
        >
          🛒 Confirm Your Order
        </h3>

        {/* Delivery Info */}
        <div className="mb-4">
          <h6 className="text-warning mb-2">Delivery Details</h6>
          <div className="bg-secondary rounded-3 p-3 shadow-sm">
            <p className="mb-1"><strong>Address:</strong> {deliveryDetails?.address}</p>
            <p className="mb-1"><strong>Phone:</strong> {deliveryDetails?.phone}</p>
            <p className="mb-0"><strong>Location:</strong> {deliveryDetails?.location}</p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="mb-4">
          <h6 className="text-warning mb-2">Order Summary</h6>
          <div className="bg-secondary rounded-3 p-3 shadow-sm">
            {cartItems.map((item, index) => (
              <div key={index} className="d-flex justify-content-between mb-2">
                <span>{item.name} × {item.qty}</span>
                <span>₹{item.price}</span>
              </div>
            ))}

            <hr className="border-light" />

            <div className="d-flex justify-content-between fw-bold">
              <span>Total</span>
              <span className="text-success">₹{totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <button
          className="btn btn-success w-100 py-2 fw-semibold"
          style={{ borderRadius: "25px", fontSize: "1rem", transition: "0.2s" }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          onClick={handleConfirm}
          disabled={!cartItems.length}
        >
          ✅ Confirm Order
        </button>
      </div>
    </div>
  );
}
