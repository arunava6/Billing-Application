import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-box">

        <FaExclamationTriangle className="notfound-icon" />

        <h1>404</h1>
        <h2>Page Not Found</h2>

        <p>
          Oops! The page you are looking for does not exist or has been moved.
        </p>

        <Link to="/dashboard" className="home-btn">
          Go Back Home
        </Link>

      </div>
    </div>
  );
};

export default NotFound;
