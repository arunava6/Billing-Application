import React, { useContext } from 'react'
import './Explore.css'
import { AppContext } from '../../Context/AppContext'


const Explore = () => {

  const { categories } = useContext(AppContext);
  console.log(categories);


  return (
    <div className="explore-container">

      {/* LEFT SIDE */}
      <div className="explore-left">

        {/* Categories Section */}
        <div className="explore-card categories-section">
          <h5>Categories</h5>
          <div className="categories-content">
            Category list here...
          </div>
        </div>

        {/* Items Section */}
        <div className="explore-card items-section">
          <h5>Items</h5>
          <div className="items-content">
            Items grid here...
          </div>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="explore-right">

        {/* Customer Form */}
        <div className="explore-card">
          <h5>Customer Details</h5>
          <div>Customer form here...</div>
        </div>

        {/* Cart Items */}
        <div className="explore-card">
          <h5>Cart Items</h5>
          <div>Cart items list here...</div>
        </div>

        {/* Cart Summary */}
        <div className="explore-card">
          <h5>Cart Summary</h5>
          <div>Total, tax, etc...</div>
        </div>

      </div>

    </div>
  )
}

export default Explore