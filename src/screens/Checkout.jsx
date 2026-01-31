import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    address: "",
    phone: "",
    location: ""
  });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    localStorage.setItem("deliveryDetails", JSON.stringify(details));
    navigate("/confirm-order");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card bg-dark text-light shadow-lg rounded-4 p-4 w-100 position-relative"
        style={{ maxWidth: "420px" }}
      >

        {/* Cross Button */}
        <button
          type="button"
          className="btn-close btn-close-white position-absolute top-0 end-0 m-3"
          aria-label="Close"
          onClick={() => navigate(-1)}
        ></button>

        <h3 className="text-success text-center mb-4">
          Delivery Details
        </h3>

        {/* Address */}
        <div className="mb-3">
          <label className="form-label text-muted">Address</label>
          <input
            type="text"
            name="address"
            className="form-control bg-secondary text-light border-0"
            placeholder="Enter full address"
            onChange={handleChange}
          />
        </div>

        {/* Phone */}
        <div className="mb-3">
          <label className="form-label text-muted">Phone Number</label>
          <input
            type="tel"
            name="phone"
            className="form-control bg-secondary text-light border-0"
            placeholder="01XXXXXXXXX"
            onChange={handleChange}
          />
        </div>

        {/* Location */}
        <div className="mb-4">
          <label className="form-label text-muted">Location</label>
          <input
            type="text"
            name="location"
            className="form-control bg-secondary text-light border-0"
            placeholder="City / Area"
            onChange={handleChange}
          />
        </div>

        <button
          className="btn btn-success w-100 fw-semibold py-2"
          onClick={handleNext}
          disabled={!details.address || !details.phone || !details.location}
        >
          Continue to Confirm
        </button>

      </div>
    </div>
  );
}
