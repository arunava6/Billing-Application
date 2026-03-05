import React, { useContext } from 'react'
import './DisplayItems.css'
import { AppContext } from '../../Context/AppContext'

const DisplayItems = ({ items }) => {

  const {addToCart}=useContext(AppContext)

  const handleAddToCart=(item)=>{
    addToCart(item)
  }

  return (
    <div className="item-scroll-container">

      {items && items.length > 0 ? (
        items.map((item) => (
          <div key={item.itemId} className="item-horizontal-card">

            <div className="item-cart-icon">
              <i className="bi bi-cart3"></i>
            </div>

            <div className="item-image-wrapper">
              {item.imgUrl ? (
                <img
                  src={item.imgUrl}
                  alt={item.name}
                  className="item-image"
                />
              ) : (
                <div className="item-image-placeholder">
                  No Image
                </div>
              )}
            </div>

            <div className="item-info">
              <h6 className="item-name">{item.name}</h6>
              <p className="item-category">{item.categoryName}</p>
              <p className="item-price">₹{item.price}</p>
            </div>

            <button className="item-plus-btn" onClick={()=>handleAddToCart(item)}>
              <i className="bi bi-plus"></i>
            </button>

          </div>
        ))
      ) : (
        <p className="text-light">No Items Available</p>
      )}

    </div>
  )
}

export default DisplayItems
