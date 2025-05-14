import React from "react";
import { useNavigate } from "react-router-dom";
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
        <h1>Welcome to VFSTR Procurement Management System</h1>
        <p>
          Our platform streamlines the procurement process for vendors, users, and administrators.The login button is used for admin,user and vendor logins where as, registration button is used for vendors to register.
        </p>
        <div className="home-buttons">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/vendor-registration")}>Register</button>
        </div>
      </div>
      <style>{`
      /* Main Container */
        .home-container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 70vh;
        padding: 20px;
        background-color: #f5f5f5;
    }

    /* Left Side - Image */
    .home-image {
        flex: 1;
        display: flex;
        justify-content: center;
    }

    .home-image img {
        width: 90%;
        max-width: 500px;
        border-radius: 10px;
    }

    /* Right Side - Content */
    .home-content {
        flex: 1;
        padding: 20px;
        text-align: left;
    }

    .home-content h1 {
        font-size: 32px;
        color: #333;
        margin-bottom: 10px;
    }

    .home-content p {
        font-size: 18px;
        color: #555;
        margin-bottom: 20px;
    }

    /* Button Container */
    .home-buttons {
        display: flex;
        gap: 20px;
        margin-top: 10px;
    }

    /* Buttons */
    .home-buttons button {
        background-color: red;
        color: white;
        border: none;
        padding: 12px 30px;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        border-radius: 5px;
        text-transform: uppercase;
        width: 150px;
        height: 50px;
        text-align: center;
    }

    .home-buttons button:hover {
        background-color: darkred;
    }

      `}</style>
    </div>
  );
}

export default Home;
