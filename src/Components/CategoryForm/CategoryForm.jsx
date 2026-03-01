import React, { useContext, useEffect, useState } from 'react'
import { addCategory } from '../../Services/CategoryService'
import toast from 'react-hot-toast'
import { AppContext } from '../../Context/AppContext'

const CategoryForm = () => {

    const { categories, setCategories } = useContext(AppContext)
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        bgColor: '#2c2c2c'
    })

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleImage = (e) => {
        setImage(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        if (!image) {
            toast.error("Select image for category")
            setLoading(false)
            return
        }
        const data = new FormData();
        data.append('category', JSON.stringify(formData))
        data.append('file', image)
        try {
            let response = await addCategory(data)
            if (response.status === 201) {
                setCategories([...categories, response.data])
                toast.success('Saved Successfully!!')
                setFormData({
                    name: '',
                    description: '',
                    bgColor: '#2c2c2c'
                })
                setImage(null)
            } else {
                toast.error("error in adding")
            }
        } catch (error) {
            toast.error('server error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-10 col-md-12 col-sm-12">
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <h3 className="card-title text-center mb-4">Add Category</h3>
                            <form id="registrationForm" onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Category Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name='name'
                                        placeholder="Enter category name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="bio" className="form-label">descriptionription</label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        name='description'
                                        rows="3"
                                        placeholder="write content here..."
                                        value={formData.description}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="bgcolor" className="form-label">Background Color</label>
                                    <br />
                                    <input
                                        type="color"
                                        id="bgcolor"
                                        name='bgColor'
                                        value={formData.bgColor}
                                        onChange={handleChange}
                                        placeholder="rgb(0, 0, 0)"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Category Image</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept="image/*"
                                        onChange={handleImage}
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
                                            "Save"
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

export default CategoryForm