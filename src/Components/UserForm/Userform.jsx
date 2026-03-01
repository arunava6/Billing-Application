import React, { useState } from 'react'
import { addUser } from '../../Services/UserService'
import toast from 'react-hot-toast'

const Userform = ({ setUsers }) => {

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        role: "USER"
    })

    const OnChangeHandler = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {

            let response = await addUser(data)
            setUsers((prevUsers) => [...prevUsers, response.data])
            if (response.status === 201) {
                console.log(response.data);
                toast.success("User added Successfully")
                setData({
                    name: "",
                    email: "",
                    password: "",
                    role: "USER"
                })
                setLoading(false)
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
                    <div className="card shadow-lg">
                        <div className="card-body">
                            {/* <h3 className="card-title text-center mb-4">Add Category</h3> */}
                            <form id="registrationForm" onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        id="name"
                                        placeholder="John Doe"
                                        value={data.name}
                                        onChange={OnChangeHandler}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name='email'
                                        className="form-control"
                                        id="email"
                                        placeholder="johndoe@gmail.com"
                                        value={data.email}
                                        onChange={OnChangeHandler}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        name='password'
                                        className="form-control"
                                        id="password"
                                        placeholder="Enter password"
                                        value={data.password}
                                        onChange={OnChangeHandler}
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
                                                Adding...
                                            </>
                                        ) : (
                                            "Add"
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

export default Userform