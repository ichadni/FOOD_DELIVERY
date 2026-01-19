import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/myorder", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: localStorage.getItem('userEmail') })
      });

      const response = await res.json();

      // Fix old nested array orders
      const formattedOrders = response.orderData?.map(order => {
        if (Array.isArray(order)) {
          return { order_date: new Date().toISOString(), order_data: order };
        }
        return {
          order_date: order.order_date,
          order_data: order.order_data || order.items || []
        };
      }) || [];

      setOrderData(formattedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <Navbar />

      <div className='container'>
        {orderData.length > 0 ? (
          orderData
            .slice(0)
            .reverse()
            .map((order, index) => {
              const items = order.order_data;
              const orderDate = order.order_date;

              return (
                <div key={index} className='mb-5'>
                  <div className='m-auto mt-5'>
                    <h4>Order Date: {new Date(orderDate).toLocaleString()}</h4>
                    <hr />
                  </div>

                  <div className='row'>
                    {items.map(item => (
                      <div key={item.id} className='col-12 col-md-6 col-lg-3'>
                        <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                          <img
                            src={item.img || '/placeholder.png'}
                            className="card-img-top"
                            alt={item.name}
                            style={{ height: "120px", objectFit: "fill" }}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <div className='d-flex justify-content-between'>
                              <span>{item.qty}</span>
                              <span>{item.size}</span>
                              <span>₹{item.price}/-</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
        ) : (
          <p className='mt-5 text-center'>You have no orders yet.</p>
        )}
      </div>

      <Footer />
    </div>
  );
}
