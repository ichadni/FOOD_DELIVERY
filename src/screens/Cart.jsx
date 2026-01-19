import React from 'react';
import { useCart, useDispatchCart } from '../components/ContexReducer';

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3 text-white'>
          The Cart is Empty!
        </div>
      </div>
    );
  }

  const handleCheckout = async () => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      alert("Please log in first.");
      return;
    }

    try {
      const orderPayload = data.map(item => ({ ...item, qty: Number(item.qty) }));

      const response = await fetch("http://localhost:5000/api/orderdata", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          order_data: orderPayload,
          order_date: new Date().toISOString()
        })
      });

      const resJson = await response.json();
      console.log("Order Response JSON:", resJson);

      if (response.ok && resJson.success) {
        dispatch({ type: "DROP" });
        alert("Order placed successfully!");
      } else {
        alert("Failed to place order. Try again.");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Something went wrong. Try again later.");
    }
  };

  const totalPrice = data.reduce((total, foodItem) => total + foodItem.price * Number(foodItem.qty), 0);

  return (
    <div className='container m-auto table-responsive'>
      <table className='table table-hover'>
        <thead className='text-success fs-4'>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Option</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((foodItem, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{foodItem.name}</td>
              <td>{foodItem.qty}</td>
              <td>{foodItem.size}</td>
              <td>₹{foodItem.price * Number(foodItem.qty)}</td>
              <td>
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={() => dispatch({ type: "REMOVE", index })}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='fs-2 text-success mt-3'>Total Price: ₹{totalPrice}</div>
      <div className='mt-4'>
        <button className='btn bg-success' onClick={handleCheckout}>
          Check-out
        </button>
      </div>
    </div>
  );
}
