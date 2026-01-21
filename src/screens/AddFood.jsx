import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddFood() {
    const [food, setFood] = useState({
        name: "",
        CategoryName: "",
        price: "",
        img: "",
        description: ""
    });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:5000/api/addFood", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(food)
        });

        if (res.ok) {
            alert("Food item added");
            navigate("/"); // redirect to Home
        } else {
            alert("Failed to add food item");
        }
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <div className="card shadow-lg border-0 rounded-4">
                        {/* Header */}
                        <div className="card-header text-center text-white p-4 rounded-top-4" style={{ background: "linear-gradient(90deg, #FF6B6B, #FFD93D)" }}>
                            <h3 className="mb-0">Add New Food Item</h3>
                        </div>

                        {/* Body */}
                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>
                                <div className="row g-3">

                                    {/* Food Name */}
                                    <div className="col-12">
                                        <label className="form-label fw-bold">Food Name</label>
                                        <input
                                            type="text"
                                            className="form-control border-2 border-success"
                                            placeholder="e.g. Chicken Burger"
                                            required
                                            onChange={e => setFood({ ...food, name: e.target.value })}
                                        />
                                    </div>

                                    {/* Category */}
                                    <div className="col-12">
                                        <label className="form-label fw-bold">Category</label>
                                        <input
                                            type="text"
                                            className="form-control border-2 border-primary"
                                            placeholder="e.g. Fast Food"
                                            required
                                            onChange={e => setFood({ ...food, CategoryName: e.target.value })}
                                        />
                                    </div>

                                    {/* Price and Image URL side by side */}
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">Price</label>
                                        <input
                                            type="number"
                                            className="form-control border-2 border-warning"
                                            placeholder="₹"
                                            required
                                            onChange={e => setFood({ ...food, price: e.target.value })}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">Image URL</label>
                                        <input
                                            type="url"
                                            className="form-control border-2 border-info"
                                            placeholder="https://..."
                                            required
                                            onChange={e => setFood({ ...food, img: e.target.value })}
                                        />
                                    </div>

                                    {/* Description */}
                                    <div className="col-12">
                                        <label className="form-label fw-bold">Description</label>
                                        <textarea
                                            className="form-control border-2 border-secondary"
                                            rows="3"
                                            placeholder="Short description about the food"
                                            onChange={e => setFood({ ...food, description: e.target.value })}
                                        />
                                    </div>

                                    {/* Submit button */}
                                    <div className="col-12 mt-3">
                                        <button className="btn btn-gradient w-100 py-2 fw-bold" style={{ background: "linear-gradient(90deg, #6BCB77, #4D96FF)", color: "white", fontSize: "1.1rem" }}>
                                            Save Food Item
                                        </button>
                                    </div>
                                    <div className="col-12 mt-2">
                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary w-100 py-2 fw-bold"
                                            onClick={() => navigate("/")}
                                        >
                                            Back to Home
                                        </button>
                                    </div>

                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
