import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css'; // for the home icon

export default function ApproveOrder({ email, order, onApprove }) {
  const navigate = useNavigate();

  const handleApprove = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/approve-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          orderId: order._id
        })
      });

      const data = await res.json();

      if (data.success) {
        alert("Order approved!");
        // Remove approved order safely from parent state
        onApprove(prev =>
          Array.isArray(prev)
            ? prev.filter(o => o.order._id !== order._id)
            : []
        );
      }
    } catch (err) {
      console.error("Error approving order:", err);
      alert("Failed to approve order.");
    }
  };

  return (
    <div className="card mb-3 p-3 position-relative">
      
      {/* Home / Navigation icon button */}
      <button
        className="btn btn-outline-primary position-absolute top-0 end-0 m-2"
        onClick={() => navigate("/")}
        title="Go Home"
      >
        <i className="bi bi-house-door-fill"></i>
      </button>

      <h5>User: {email}</h5>
      <p>Order Date: {new Date(order.order_date).toLocaleString()}</p>

      <div className="mb-2">
        {Array.isArray(order.items) && order.items.map((item, idx) => (
          <div key={idx} className="d-flex justify-content-between">
            <span>{item.name} × {item.qty} ({item.size})</span>
            <span>₹{item.price}</span>
          </div>
        ))}
      </div>

      {order.deliveryDetails && (
        <div className="mb-2">
          <p><b>Address:</b> {order.deliveryDetails.address}</p>
          <p><b>Phone:</b> {order.deliveryDetails.phone}</p>
        </div>
      )}

      <button
        className="btn btn-success"
        onClick={handleApprove}
        disabled={order.status !== "pending"}
      >
        Approve Order
      </button>
    </div>
  );
}
