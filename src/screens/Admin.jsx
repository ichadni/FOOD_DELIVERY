import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApproveOrder from "./ApproveOrder";

export default function Admin() {
  const [pendingOrders, setPendingOrders] = useState([]);
  const navigate = useNavigate();

  const fetchPendingOrders = async () => {
    try {
      const res = await fetch("https://food-delivery-83wk.onrender.com/api/pending-orders");
      const data = await res.json();
      setPendingOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPendingOrders();
    const interval = setInterval(fetchPendingOrders, 10000); // auto refresh
    return () => clearInterval(interval);
  }, []);

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <div className="text-center mb-4">
        <h2 className="text-success">🍔 Pending Orders 🍟</h2>
      </div>

      {pendingOrders.length === 0 ? (
        <div className="text-center py-5">
          <p className="fs-5 text-warning">No pending orders right now!</p>
          <button
            className="btn btn-success btn-lg mt-3"
            onClick={handleGoBack}
          >
            🏠 Go Back Home
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {pendingOrders.map((orderObj, index) => (
            <div className="col-md-6 col-lg-4" key={index}>
              <div className="card h-100 shadow-sm border-success">
                <div className="card-body">
                  <h5 className="card-title text-success">{orderObj.email}</h5>
                  <ApproveOrder
                    email={orderObj.email}
                    order={orderObj.order}
                    onApprove={setPendingOrders}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
