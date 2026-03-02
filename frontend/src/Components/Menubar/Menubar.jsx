import React, { useContext } from 'react'
import './Menubar.css'
import { assets } from '../../assets/assets'
import { AppContext } from '../../Context/AppContext'
import { useNavigate } from 'react-router-dom'

const Menubar = () => {

    const { setAuthData } = useContext(AppContext)
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("Role")
        setAuthData(null, null)
        navigate("/login")
    }

    return (
        <nav
            className="navbar navbar-expand-lg navbar-light sticky-top"
            style={{ backgroundColor: "#e3f2fd" }}
        >
            <div className="container-fluid align-items-center">

                <a href="/dashboard" className="navbar-brand d-flex align-items-center m-0">
                    <img
                        src={assets.logo}
                        alt="CoolBrand"
                        className="logo-img"
                    />
                </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarCollapse"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse align-items-center" id="navbarCollapse">

                    <div className="navbar-nav mx-auto">
                        <a href="/dashboard" className="nav-item nav-link">Dashboard</a>
                        <a href="/explore" className="nav-item nav-link">Explore</a>
                        <a href="/items" className="nav-item nav-link">Manage Items</a>
                        <a href="/categories" className="nav-item nav-link">Manage Categories</a>
                        <a href="/users" className="nav-item nav-link">Manage Users</a>
                    </div>

                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a
                                href="#"
                                className="nav-link dropdown-toggle d-flex align-items-center user-link"
                                data-bs-toggle="dropdown"
                            >
                                <img
                                    src={assets.user}
                                    alt="User"
                                    className="user-image"
                                />
                            </a>

                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><a className="dropdown-item" href="#">Activity Log</a></li>
                                <li><a className="dropdown-item" href="#">Settings</a></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item text-danger" href="#" onClick={handleLogout}>Logout</a></li>
                            </ul>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>

    )
}

export default Menubar
