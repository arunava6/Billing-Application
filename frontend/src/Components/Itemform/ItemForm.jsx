import React from 'react'

const ItemForm = () => {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-10 col-md-12 col-sm-12">
                    <div className="card shadow-lg custom-card">
                        <div className="card-body">

                            <h4 className="card-title text-center mb-4">Add Items</h4>

                            <form>

                                {/* Product Name */}
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control custom-input"
                                        placeholder="Enter product name"
                                        required
                                    />
                                </div>

                                {/* Category Dropdown */}
                                <div className="mb-3">
                                    <label className="form-label">Category</label>
                                    <select className="form-select custom-input" required>
                                        <option value="">Select Category</option>
                                        <option value="category1">Category 1</option>
                                        <option value="category2">Category 2</option>
                                    </select>
                                </div>

                                {/* Price */}
                                <div className="mb-3">
                                    <label className="form-label">Price</label>
                                    <input
                                        type="number"
                                        className="form-control custom-input"
                                        placeholder="Enter price"
                                        min="0"
                                        step="0.01"
                                        required
                                    />
                                </div>

                                {/* Description */}
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        className="form-control custom-input"
                                        rows="3"
                                        placeholder="Write description..."
                                    ></textarea>
                                </div>

                                {/* Submit */}
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary w-100 custom-btn">
                                        Add
                                    </button>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ItemForm