import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaUserCircle, FaCaretDown } from "react-icons/fa";
import "./TopNavbar.css";

const TopNavbar = ({ setIsAuthenticated }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false); // Set authentication state to false
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="top-navbar">
      <div className="nav-right">
        <FaBell className="icon" />
        <div className="user-info" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <FaUserCircle className="icon" />
          <span className="username">Username</span>
          <FaCaretDown className="icon" />
        </div>
      </div>

      {dropdownOpen && (
        <div className="dropdown-menu">
          <ul>
            <li onClick={() => navigate("/profile")}>Profile</li>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TopNavbar;
