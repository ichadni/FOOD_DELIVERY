import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home() {
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/displaydata", {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      setFoodItems(data.Food_items || []);
      setCategories(data.Food_category || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setFoodItems([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return <div className="text-center mt-5"><h4>Loading...</h4></div>;
  }

  return (
    <div>
      <Navbar />

      {/* Small Carousel with Light Images */}
      <div className="position-relative mb-3">
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
          style={{ height: "35vh" }}
        >
          <div className="carousel-inner h-100">
            {[
              { img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&h=400&fit=crop", alt: "Burger" },
              { img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=600&h=400&fit=crop", alt: "Pizza" },
              { img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&h=400&fit=crop", alt: "Chicken" },
              { img: "https://images.unsplash.com/photo-1628294896516-344152572ee8?w=600&h=400&fit=crop", alt: "Momos" },
            ].map((slide, idx) => (
              <div key={idx} className={`carousel-item ${idx === 0 ? 'active' : ''} h-100`}>
                <img
                  src={slide.img}
                  className="d-block w-100 h-100"
                  style={{ objectFit: "cover", filter: "brightness(80%)" }}
                  alt={slide.alt}
                />
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>

          {/* Compact Search Bar */}
          <div className="carousel-caption d-flex justify-content-center" style={{ bottom: "15%" }}>
            <input
              type="search"
              className="form-control form-control-sm w-50 shadow-sm"
              placeholder="Search food..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                borderRadius: "25px",
                backgroundColor: "rgba(255,255,255,0.9)",
                border: "1px solid #ccc",
                padding: "0.25rem 0.75rem",
                fontSize: "0.9rem",
              }}
            />
          </div>
        </div>
      </div>

      {/* Categories & Food Items */}
      <div className="container my-3">
        {categories.length > 0 ? (
          categories.map((category) => {
            const catName = category.CategoryName;
            const itemsInCategory = foodItems.filter(item =>
              item.CategoryName === catName && item.name.toLowerCase().includes(search.toLowerCase())
            );

            return (
              <div key={category._id} className="mb-4"> {/* Less margin mb-4 instead of mb-5 */}
                <h4 className="mb-2 text-success">{catName}</h4> {/* Smaller margin mb-2 */}
                <hr className="mb-3" /> {/* Slightly less spacing */}
                <div className="row g-3"> {/* Smaller gap between cards */}
                  {itemsInCategory.length > 0 ? (
                    itemsInCategory.map(item => (
                      <div key={item._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <Card foodItem={item} />
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted small">No items available in this category.</p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-muted">No categories available.</p>
        )}
      </div>

      <Footer />
    </div>
  );
}
