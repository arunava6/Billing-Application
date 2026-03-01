import toast from 'react-hot-toast'
import { assets } from '../../assets/assets'
import { LoginApi } from '../../Services/LoginService'
import './Login.css'

import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../Context/AppContext'


const Login = () => {

    const navigate = useNavigate();
    const { setAuthData } = useContext(AppContext)
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)


    const OnChangeHandler = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const SubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            let response = await LoginApi(data);
            if (response.status === 200) {
                toast.success("Login success")
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("Role", response.data.role)
                setAuthData(response.data.token, response.data.role)
                navigate("/dashboard")
            }

        } catch (error) {
            toast.error("Server Error!!")
        } finally {
            setLoading(false)
        }
    }


    return (
        <div
            className="login-background d-flex justify-content-center align-items-center"
            style={{ backgroundImage: `url(${assets.billing})` }}
        >
            <div className="card shadow-lg p-4 login-card">
                <h3 className="text-center mb-4">Sign In</h3>

                <form onSubmit={SubmitHandler}>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input
                            name='email'
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={data.email}
                            onChange={OnChangeHandler}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            name='password'
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={data.password}
                            onChange={OnChangeHandler}
                        />
                    </div>

                    <div className='text-center'>
                        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                            {
                                loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"
                                            role="status"
                                            aria-hidden="true">
                                        </span>
                                        loading...
                                    </>
                                ) : (
                                    "Login"
                                )
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login