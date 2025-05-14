import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";

const Login = ({ setIsAuthenticated }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Login success:", data);

        // Store user data in localStorage
        localStorage.setItem("user_id", data.user.user_id);
        localStorage.setItem("session_id", data.session_id);
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("role", data.user.role);

        setIsAuthenticated(true);
        navigate("/dashboard");
        window.location.reload();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login_head">
          <h2>Login</h2>
        </div>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <FaUser className="icon"/>
            <input
              type="text"
              placeholder="Enter User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <MdOutlineAccountCircle className="icon" />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Vendor">Vendor</option>
            </select>
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>

        <div className="forgot-password">
          <a href="#">Forgot Password?</a>
        </div>
      </div>
      <style>{`
      /* 🌟 Centered container with White Background */
      .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 85vh;
          background: white;
      }

      /* 🟩 Login card (form box) */
      .login-card {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
          width: 350px;
          text-align: center;
          border: 1px solid #ccc;
          position: relative; /* Allows absolute positioning inside */
      }

      .login_head{
          background:  rgb(237, 121, 37);
          color: white;
          font-size: 20px;
          font-weight: bold;
          padding: 12px 0;
          width: 100%;
          height:40px;
          border-radius: 12px 12px 0 0;
          position: absolute;
          top: -40px; /* Moves it above the card */
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;   
      }

      /* 🖋 Input field design */
      .input-group {
          display: flex;
          align-items: center;
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 10px;
          margin-top: 30px; /* Push down to avoid overlapping the red box */
          background: white;
      }

      /* Inputs and Dropdown */
      .input-group input,
      .input-group select {
          border: none;
          outline: none;
          background: transparent;
          width: 100%;
          font-size: 16px;
          padding: 5px;
      }

      /* ✨ Icons */
      .icon {
          margin-right: 10px;
          color: #555;
          font-size: 18px;
      }

      /* 🔴 Login Button in Red */
      .login-btn {
          width: 100%;
          background:  rgb(236, 118, 33);
          color: white;
          border: none;
          padding: 12px;
          font-size: 16px;
          border-radius: 8px;
          cursor: pointer;
          margin-top: 15px;
          transition: 0.3s ease-in-out;
      }

      .login-btn:hover {
          background:  rgba(165, 71, 3, 0.813);
      }
      .forgot-password {
          text-align: center;
          margin-top: 10px;
      }

      .forgot-password a {
          color: rgba(165, 71, 3, 0.813);  /* Red color */
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
      }

      .forgot-password a:hover {
          text-decoration: underline;
      }


      `}</style>
    </div>
  );
};

export default Login;
