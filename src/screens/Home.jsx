import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';


export default function Home() {
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem('role');


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
      <div>

        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
          style={{ objectFit: "contain!important" }}
        >
          <div className="carousel-inner" id='carousel'>
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search}
                  onChange={(e) => setSearch(e.target.value)} />

              </div>
            </div>

            <div className="carousel-item active">
              <img
                src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=900&h=700&fit=crop"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="Burger"
              />
            </div>

            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=900&h=700&fit=crop"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="Pizza"
              />
            </div>

            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=900&h=700&fit=crop"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="Chicken"
              />
            </div>

            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1628294896516-344152572ee8?w=900&h=700&fit=crop"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="Momos"
              />
            </div>

          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

      </div>

      <div className="container my-5">
        
        {categories.length > 0 ? (
          categories.map((category) => {
            const catName = category.CategoryName;
            const itemsInCategory = foodItems.filter(item => item.CategoryName === catName && item.name.toLowerCase().includes(search.toLowerCase()));

            return (
              <div key={category._id} className="mb-5">
                <h3 className="mb-3">{catName}</h3>
                <hr />
                <div className="row g-4">
                  {itemsInCategory.length > 0 ? (
                    itemsInCategory.map(item => (
                      <div key={item._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <Card foodItem={item} />
                      </div>
                    ))
                  ) : (
                    <p className="text-center">No items available in this category.</p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center">No categories available.</p>
        )}
      </div>

      <Footer />
    </div>
  );
}
