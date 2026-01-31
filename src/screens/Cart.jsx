import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart, useDispatchCart } from "../components/ContexReducer";

export default function Cart() {
  const cartItems = useCart();
  const dispatch = useDispatchCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.price) ,
    0
  );

  const handleCheckout = () => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      alert("Please log in first.");
      return;
    }

    // ✅ Move to checkout page
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-75">
        <h3 className="text-light">Your cart is empty 🛒</h3>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="card shadow-lg bg-dark text-light rounded-4">
        <div className="card-body">

          <h3 className="mb-4 text-success text-center">Your Cart</h3>

          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle">
              <thead className="table-success text-dark">
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
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.qty}</td>
                    <td>{item.size}</td>
                    <td>₹{(Number(item.price))}</td>
                    <td>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => dispatch({ type: "REMOVE", index })}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <h4 className="text-success">Total: ₹{totalPrice}</h4>

            <button
              className="btn btn-success px-4 py-2 fw-semibold"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
