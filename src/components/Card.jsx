import React from 'react'

export default function Card() {
    return (
        <div>
            <div>
                <div className="card mt-3" style={{ "width": "18rem", overflow:"visible" }}>
                    <img src="https://images.unsplash.com/photo-1577805947697-89e18249d767?w=300&h=300&fit=crop" className="card-img-top" alt="Orange Juice" />
                    <div className="card-body" style={{ overflow: "visible" }}>
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example.</p>
                        <div className='container w-100'>
                            <select className='m-2 h-100  bg-success rounded' defaultValue="1">
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    )
                                })}

                            </select>
                            <select className='m-2 h-100  bg-success rounded' defaultValue="half">
                                <option value="half">Half</option>
                                <option value="full">Full</option>
                            </select>
                            <div className='d-inline h-100 fs-5'>
                                Total price
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
