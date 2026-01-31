import React, { useEffect, useState } from "react";
import ApproveOrder from "./ApproveOrder";

export default function Admin() {
  const [pendingOrders, setPendingOrders] = useState([]);

  const fetchPendingOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/pending-orders");
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

  return (
    <div className="container mt-4">
      <h2>Pending Orders</h2>
      {pendingOrders.length === 0 ? (
        <p>No pending orders</p>
      ) : (
        pendingOrders.map((orderObj, index) => (
          <ApproveOrder
            key={index}
            email={orderObj.email}
            order={orderObj.order}
            onApprove={setPendingOrders} // refresh after approve
          />
        ))
      )}
    </div>
  );
}
