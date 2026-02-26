import React from 'react'
import './Menubar.css'
import {assets} from '../../assets/assets'

const Menubar = () => {
    return (
        <>
            <nav
                className="navbar sticky-top navbar-expand-lg navbar-light"
                style={{ backgroundColor: "#e3f2fd" }}
            >
                <div className="container-fluid">

                    <a href="#" className="navbar-brand">
                        <img
                            src={assets.logo}
                            height="50"
                            alt="CoolBrand"
                        />
                    </a>

                    <button
                        type="button"
                        className="navbar-toggler"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav">
                            <a href="/dashboard" className="nav-item nav-link">Dashboard</a>
                            <a href="/explore" className="nav-item nav-link">Explore</a>
                            <a href="/items" className="nav-item nav-link">Manage Items</a>
                            <a href="/categories" className="nav-item nav-link">Manage Categories</a>
                            <a href="/users" className="nav-item nav-link">Manage Users</a>

                        </div>

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Menubar
