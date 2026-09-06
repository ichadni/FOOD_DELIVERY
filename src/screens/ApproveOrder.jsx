import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function ApproveOrder({ email, order, onApprove }) {
  const navigate = useNavigate();

  const handleApprove = async () => {
    try {
      const res = await fetch("https://food-delivery-83wk.onrender.com/api/approve-order", {
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
    <div 
      className="card mb-3 p-3 position-relative shadow-sm border-success"
      style={{
        borderRadius: "15px",
        background: "linear-gradient(145deg, #d4edda, #fffbea)", // soft green-yellow
        transition: "transform 0.2s",
      }}
      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
    >
      {/* Home / Navigation icon button */}
      <button
        className="btn btn-outline-primary position-absolute top-0 end-0 m-2"
        onClick={() => navigate("/")}
        title="Go Home"
      >
        <i className="bi bi-house-door-fill"></i>
      </button>

      <h5 className="text-success">👤 {email}</h5>
      <p className="text-muted" style={{ fontSize: "0.9rem" }}>
        📅 {new Date(order.order_date).toLocaleString()}
      </p>

      <div className="mb-2">
        {Array.isArray(order.items) && order.items.map((item, idx) => (
          <div key={idx} className="d-flex justify-content-between border-bottom pb-1 mb-1">
            <span>🍴 {item.name} × {item.qty} ({item.size})</span>
            <span className="fw-bold text-success">৳{item.price}</span>
          </div>
        ))}
      </div>

      {order.deliveryDetails && (
        <div className="mb-2 bg-light p-2 rounded">
          <p className="mb-1"><b>🏠 Address:</b> {order.deliveryDetails.address}</p>
          <p className="mb-0"><b>📞 Phone:</b> {order.deliveryDetails.phone}</p>
        </div>
      )}

      <button
        className={`btn btn-success w-100 mt-2 ${order.status !== "pending" ? "disabled" : ""}`}
        onClick={handleApprove}
      >
        ✅ Approve Order
      </button>
    </div>
  );
}
