import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

/* Status → Bootstrap color */
const getStatusColor = (status) => {
  switch (status) {
    case "Delivered":
      return "success";
    case "Confirmed":
      return "info";
    case "Cancelled":
      return "danger";
    default:
      return "warning"; // Pending
  }
};

export default function MyOrder() {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/myorder", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: localStorage.getItem('userEmail')
        })
      });

      const data = await res.json();
      setOrderData(Array.isArray(data.orderData) ? data.orderData : []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
    const interval = setInterval(fetchMyOrder, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container my-4">
        {orderData.length === 0 ? (
          <div className="text-center mt-5">
            <p className="fs-5 mb-3">You have no orders yet.</p>
            <button
              className="btn btn-outline-success"
              onClick={() => navigate("/")}
            >
              Go to Home
            </button>
          </div>
        ) : (
          orderData
            .slice()
            .reverse()
            .map((order, index) => {
              const items = Array.isArray(order.items) ? order.items : [];

              const orderTotal = items.reduce(
                (sum, item) => sum + Number(item.price || 0),
                0
              );

              return (
                <div
                  key={index}
                  className="mb-5 p-3 border rounded shadow-sm bg-light"
                >
                  {/* Order Header */}
                  <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <h5 className="mb-0">
                      Order Date:{" "}
                      {new Date(order.order_date).toLocaleString()}
                    </h5>

                    <div className="d-flex align-items-center gap-3">
                      <span
                        className={`badge bg-${getStatusColor(
                          order.status || "Pending"
                        )}`}
                      >
                        {order.status || "Pending"}
                      </span>

                      <span className="fw-bold text-success">
                        Total: ₹{orderTotal}
                      </span>
                    </div>
                  </div>

                  <hr />

                  {/* Order Items */}
                  <div className="row g-3">
                    {items.map((item, idx) => (
                      <div
                        key={idx}
                        className="col-12 col-sm-6 col-md-4 col-lg-3"
                      >
                        <div className="card h-100 shadow-sm">
                          <img
                            src={item.img || "/placeholder.png"}
                            className="card-img-top"
                            alt={item.name}
                            style={{ height: "140px", objectFit: "cover" }}
                          />
                          <div className="card-body d-flex flex-column">
                            <h6 className="card-title">{item.name}</h6>

                            <div className="mt-auto small text-muted">
                              <div className="d-flex justify-content-between">
                                <span>Qty:</span>
                                <span>{item.qty}</span>
                              </div>
                              <div className="d-flex justify-content-between">
                                <span>Size:</span>
                                <span>{item.size}</span>
                              </div>
                              <div className="d-flex justify-content-between fw-bold">
                                <span>Price:</span>
                                <span>₹{item.price}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
        )}
      </div>

      <Footer />
    </div>
  );
}
