import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home"; // Home Page
import Login from "./Pages/Login"; // Login Page
import Profile from "./Pages/Profile"; // Profile Page
import Dashboard from "./Pages/Dashboard"; // Dashboard Page
import VendorRegistration from "./Pages/VendorRegistration"; // Vendor Registration Page
import Navbar from "./Components/Navbar/Navbar"; // Main Navbar (Always Visible)
import TopNavbar1 from "./Components/Navbar/TopNavbar"; // Dashboard Navbar
import Navbar1 from "./Components/Navbar/Navbar1"; // Side Navbar

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Main Navbar (Always Visible) */}

        {/* Show Dashboard Navbar & Side Navbar only after login */}
        {isAuthenticated && (
          <>
            <TopNavbar1 setIsAuthenticated={setIsAuthenticated} />
            <div className="dash">
              <Navbar1 />
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Navigate to="/dashboard" />} /> 
              </Routes>
            </div>
            <Routes>
            </Routes>
          </>
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/vendor-registration" element={<VendorRegistration />} />
          {!isAuthenticated && <Route path="*" element={<Navigate to="/login" />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
