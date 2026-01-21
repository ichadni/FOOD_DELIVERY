import React, { useState, useEffect } from 'react';
import { useCart, useDispatchCart } from './ContexReducer';

const colors = [
  "#FFD700", // gold
  "#FF7F50", // coral
  "#87CEFA", // light blue
  "#FFB6C1", // light pink
  "#90EE90", // light green
  "#FFA07A", // light salmon
];

export default function Card({ foodItem }) {
  if (!foodItem) return null;

  const role = localStorage.getItem('role');
  const dispatch = useDispatchCart();
  const cartData = useCart();

  const basePrice = Number(foodItem.price);
  const sizeOptions = { Half: basePrice, Full: basePrice * 2 };

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('Half');
  const [finalPrice, setFinalPrice] = useState(basePrice);

  useEffect(() => {
    setFinalPrice(qty * sizeOptions[size]);
  }, [qty, size]);

  const handleAddToCart = () => {
    const existingItem = cartData.find(
      item => item.id === foodItem._id && item.size === size
    );

    if (existingItem) {
      dispatch({
        type: "UPDATE",
        id: foodItem._id,
        size,
        qty,
        price: finalPrice
      });
    } else {
      dispatch({
        type: "ADD",
        id: foodItem._id,
        name: foodItem.name,
        price: finalPrice,
        qty,
        size,
        img: foodItem.img,
      });
    }
  };

  
  const cardColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div
      className="card h-100 text-dark shadow-lg"
      style={{
        borderRadius: "20px",
        background: cardColor,
        transition: "transform 0.3s, box-shadow 0.3s",
        overflow: "hidden",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
      }}
    >
      <img
        src={foodItem.img}
        alt={foodItem.name}
        className="card-img-top"
        style={{
          height: "180px",
          objectFit: "cover",
          transition: "transform 0.3s",
        }}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-truncate">{foodItem.name}</h5>
        <p className="card-text flex-grow-1">{foodItem.description || "Delicious food!"}</p>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <select
            className="form-select form-select-sm me-2"
            value={qty}
            onChange={e => setQty(Number(e.target.value))}
          >
            {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
          </select>

          <select
            className="form-select form-select-sm"
            value={size}
            onChange={e => setSize(e.target.value)}
          >
            {Object.keys(sizeOptions).map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-bold fs-5">₹ {finalPrice}</span>
          {role !== 'admin' && (
            <button className="btn btn-dark btn-sm" onClick={handleAddToCart}>
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
