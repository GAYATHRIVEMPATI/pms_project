import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import homeImage from '../Components/Assets/home_image.png';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Left Side - Image */}
      <div className="home-image">
        <img src={homeImage} alt="Procurement System" />
      </div>

      {/* Right Side - Content */}
      <div className="home-content">
        <h1>Welcome to Our Procurement Management System</h1>
        <p>
          Our platform streamlines the procurement process for vendors, users, and administrators.
        </p>
        <div className="home-buttons">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/vendor-registration")}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
