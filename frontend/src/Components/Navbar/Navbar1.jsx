import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaTachometerAlt, FaClipboardList, FaChartBar, FaEnvelope, FaCog } from "react-icons/fa"; 
import "./Navbar1.css";

const Navbar1 = () => {
    const navigate = useNavigate(); // Initialize navigate function

    return (
        <div className="navbar1">
            <ul className="user_bar">
                <li onClick={() => navigate("/dashboard")}>
                    <FaTachometerAlt className="icon" /> Dashboard
                </li>
                <li onClick={() => navigate("/requests")}>
                    <FaClipboardList className="icon" /> Requests
                </li>
                <li onClick={() => navigate("/reports")}>
                    <FaChartBar className="icon" /> Reports
                </li>
                <li onClick={() => navigate("/messages")}>
                    <FaEnvelope className="icon" /> Messages
                </li>
                <li onClick={() => navigate("/settings")}>
                    <FaCog className="icon" /> Settings
                </li>
            </ul>
        </div>
    );
};

export default Navbar1;
