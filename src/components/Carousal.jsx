import React from 'react'

export default function Carousal() {
  return (
    <div>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{objectFit:"contain!important"}}
      >
        <div className="carousel-inner" id='carousel'>
          <div className="carousel-caption" style={{zIndex:"10"}}>
            <form className="d-flex">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
    </form>
          </div>

          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=900&h=700&fit=crop"
              className="d-block w-100"
              style={{filter:"brightness(30%)"}}
              alt="Burger"
            />
          </div>

          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=900&h=700&fit=crop"
              className="d-block w-100"
              style={{filter:"brightness(30%)"}}
              alt="Pizza"
            />
          </div>

          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=900&h=700&fit=crop"
              className="d-block w-100"
              style={{filter:"brightness(30%)"}}
              alt="Chicken"
            />
          </div>

          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1628294896516-344152572ee8?w=900&h=700&fit=crop"
              className="d-block w-100"
              style={{filter:"brightness(30%)"}}
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
  )
}
