import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import "./Login.css";

const Login = ({ setIsAuthenticated }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("User ID:", userId, "Password:", password, "Role:", role);

    // Simulating authentication (Replace with actual authentication logic)
    if (userId && password && role) {
      setIsAuthenticated(true);
      navigate("/dashboard"); // Redirect to Dashboard
    } else {
      alert("Please fill in all fields.");
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
            <FaUser className="icon" />
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
            <select value={role} onChange={(e) => setRole(e.target.value)} required>
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
    </div>
  );
};

export default Login;
