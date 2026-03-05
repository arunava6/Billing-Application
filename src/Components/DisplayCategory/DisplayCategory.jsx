import React from 'react'
import './DisplayCategory.css'

const DisplayCategory = ({ categories }) => {
  return (
    <div className="category-scroll-container">

      {categories && categories.length > 0 ? (
        categories.map((category) => (
          <div
            key={category.categoryId}
            className="category-horizontal-card"
          >

            {/* Image */}
            <div className="category-image-wrapper">
              {category.imgUrl ? (
                <img
                  src={category.imgUrl}
                  alt={category.name}
                  className="category-image"
                />
              ) : (
                <div className="category-image-placeholder">
                  No Image
                </div>
              )}
            </div>

            {/* Info */}
            <div className="category-info">
              <h6 className="category-name">
                {category.name?.toUpperCase()}
              </h6>

              {category.items && (
                <p className="category-price">
                  Items: {category.items}
                </p>
              )}
            </div>

          </div>
        ))
      ) : (
        <p className="text-light">No Categories Available</p>
      )}

    </div>
  )
}

export default DisplayCategory