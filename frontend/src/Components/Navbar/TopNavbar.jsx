import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaUserCircle, FaCaretDown } from "react-icons/fa";

const TopNavbar = ({ setIsAuthenticated }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState(""); // Store the real username
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    console.log("Stored username:", storedUsername); // Debug
    if (storedUsername) setUsername(storedUsername);
  }, []);
  

  const handleLogout = async () => {
    const sessionId = localStorage.getItem("session_id");

    try {
      const response = await fetch("http://localhost:5000/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session_id: sessionId }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Logout successful:", data);

        // Clear session-related data
        localStorage.removeItem("user_id");
        localStorage.removeItem("session_id");
        localStorage.removeItem("username");

        setIsAuthenticated(false);
        navigate("/login");
      } else {
        alert(data.message || "Logout failed.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="top-navbar">
      <div className="nav-right">
        <FaBell className="icon" />
        <div className="user-info" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <FaUserCircle className="icon" />
          <span className="username">{username || "Username"}</span> {/* Display the real username */}
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
      <style>{`
      /* Top Navbar Styles */
      .top-navbar {
          height: 40px;
          background-color: white;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding: 0 20px;
          box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
          top: 0;
          left: 300px; /* Start after the left navbar */
          right: 0;
          z-index: 100;
      }

      /* Right-side content */
      .nav-right {
          display: flex;
          align-items: center;
          gap: 20px;
          cursor: pointer;
      }

      /* Icons */
      .icon {
          font-size: 20px;
          color: #333;
      }

      /* User info section */
      .user-info {
          display: flex;
          align-items: center;
          gap: 10px;
      }
      .username {
          margin-left: 8px;
          font-weight: 600;
          color: #333;
        }
      /* Dropdown Menu */
      .dropdown-menu {
          position: absolute;
          top: 140px; /* Move it down slightly */
          right: 0; /* Align it properly */
          background: white;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          padding: 10px;
          border-radius: 5px;
          z-index: 1000;
          display: block; /* Hide dropdown by default */
      }

      /* Ensure dropdown opens properly */
      .dropdown-open {
          display: block;
      }

      /* Prevent overlap with icon */
      .dropdown {
          position: relative; /* Ensure proper positioning */
      }


      .dropdown-menu ul {
          list-style: none;
          padding: 10px;
          margin: 0;
      }

      .dropdown-menu li {
          padding: 10px;
          cursor: pointer;
      }

      .dropdown-menu li:hover {
          background: #f0f0f0;
      }



      `}</style>
    </div>
  );
};

export default TopNavbar;
