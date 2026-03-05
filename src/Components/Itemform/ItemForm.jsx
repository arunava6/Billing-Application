import React, { useContext, useRef, useState } from 'react'
import { AppContext } from '../../Context/AppContext'
import toast from 'react-hot-toast'
import { addItem } from '../../Services/ItemService'

const ItemForm = () => {

    const { categories, items, setItems, setCategories } = useContext(AppContext)

    const fileInputRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [data, setData] = useState({
        name: "",
        description: "",
        price: 0,
        categoryId: ""
    })

    const OnHandleChange = (event) => {
        const { name, value } = event.target;

        setData({
            ...data,
            [name]: name === "price" ? parseFloat(value) : value
        });
    }

    const handleImage = (event) => {
        setImage(event.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (!image) {
            toast.error("Select image fot items")
            setLoading(false)
            return
        }

        const updatedData = new FormData()
        updatedData.append('file', image)
        updatedData.append('item', JSON.stringify(data))
        try {
            let response = await addItem(updatedData)
            if (response.status === 201) {
                toast.success("Added Successfully")
                setItems([...items, response.data])
                setCategories((prevCategories) =>
                    prevCategories.map((category) => category.categoryId === data.categoryId ? {
                        ...category, items: category.items + 1
                    } : category))
                setData({
                    name: "",
                    description: "",
                    price: 0,
                    categoryId: ""
                })

                setImage(null)
                if (fileInputRef.current) {
                    fileInputRef.current.value = ""
                }
            } else {
                toast.error("Error in adding")
            }
        } catch (error) {
            toast.error("Server error")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-10 col-md-12 col-sm-12">
                    <div className="card shadow-lg custom-card">
                        <div className="card-body">

                            <h4 className="card-title text-center mb-4">Add Items</h4>

                            <form onSubmit={handleSubmit}>
                                {/* Product Name */}
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        name='name'
                                        className="form-control custom-input"
                                        placeholder="Enter product name"
                                        value={data.name}
                                        onChange={OnHandleChange}
                                        required
                                    />
                                </div>

                                {/* description*/}
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        className="form-control custom-input"
                                        name="description"
                                        rows="3"
                                        placeholder="Write description..."
                                        value={data.description}
                                        onChange={OnHandleChange}
                                    ></textarea>
                                </div>

                                {/* Price */}
                                <div className="mb-3">
                                    <label className="form-label">Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        className="form-control custom-input"
                                        placeholder="Enter price"
                                        min="0"
                                        step="0.01"
                                        value={data.price}
                                        onChange={OnHandleChange}
                                        required
                                    />
                                </div>

                                {/* Category Dropdown */}
                                <div className="mb-3">
                                    <label className="form-label">Category</label>
                                    <select className="form-select custom-input"
                                        name='categoryId'
                                        value={data.categoryId}
                                        onChange={OnHandleChange}
                                        required
                                    >
                                        <option value="">---Select Category---</option>
                                        {
                                            categories.map(category => (
                                                <option key={category.categoryId}
                                                    value={category.categoryId}>
                                                    {category.name.toUpperCase()}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Item Image</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept="image/*"
                                        onChange={handleImage}
                                        ref={fileInputRef}
                                        required
                                    />
                                </div>

                                <div className="text-center">
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span
                                                    className="spinner-border spinner-border-sm me-2"
                                                    role="status"
                                                    aria-hidden="true"
                                                ></span>
                                                Saving...
                                            </>
                                        ) : (
                                            "Add Item"
                                        )}
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