import React, { useState, useEffect } from 'react';
import { useCart, useDispatchCart } from './ContexReducer';




export default function Card({ foodItem, options }) {
  if (!foodItem) return null;
  
  const role = localStorage.getItem('role');

  const dispatch = useDispatchCart();
  const data = useCart();


  const defaultOptions = foodItem.name.toLowerCase().includes("pizza")
    ? { Small: 300, Medium: 600, Large: 800 }
    : { Half: foodItem.price || 250, Full: (foodItem.price || 250) * 2 }; // non-pizza Half/Full

  const priceOptions = options ? Object.keys(options) : Object.keys(defaultOptions);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(priceOptions[0]);
  const [finalPrice, setFinalPrice] = useState(
    qty * (options ? options[size] : defaultOptions[size])
  );


  useEffect(() => {
    setFinalPrice(qty * (options ? options[size] : defaultOptions[size]));
  }, [qty, size, options]);

  const handleAddToCart = async () => {
    let food = null;


    for (const item of data) {
      if (item.id === foodItem._id && item.size === size) {
        food = item;
        break;
      }
    }

    if (food) {

      dispatch({ type: "UPDATE", id: food.id, price: finalPrice, qty: qty });
      return;
    }


    await dispatch({
      type: "ADD",
      id: foodItem._id,
      name: foodItem.name,
      price: options ? options[size] : defaultOptions[size],
      qty: qty,
      size: size,
      img: foodItem.img,
    });
    console.log(data);
  };

  return (
    <div className="card mt-3 mb-4" style={{ width: "100%", overflow: "visible" }}>
      <img
        src={foodItem.img}
        className="card-img-top"
        alt={foodItem.name}
        style={{ height: "160px", objectFit: "cover" }}
      />

      <div className="card-body">
        <h5 className="card-title">{foodItem.name}</h5>
        <p className="card-text">{foodItem.description}</p>

        <div className="container w-100 d-flex align-items-center">

          <select
            className="m-2 h-100 bg-success rounded"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
          >
            {Array.from({ length: 6 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>


          <select
            className="m-2 h-100 bg-success rounded"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            {priceOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>

          {/* Display final price */}
          <div className="d-inline h-100 fs-5 ms-2">₹{finalPrice}</div>
        </div>

        <hr />

        {role !== 'admin' && (
          <button className="btn btn-success w-100 mt-2" onClick={handleAddToCart}>
            Add to Cart
          </button>
        )}

      </div>
    </div>
  );
}
