import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaTachometerAlt, FaClipboardList, FaChartBar, FaEnvelope, FaCog } from "react-icons/fa";

const Navbar1 = () => {
    const navigate = useNavigate(); // Initialize navigate function

    return (
        <div className="navbar1">
            <ul className="user_bar">
                <li onClick={() => navigate("/dashboard")}>
                    <FaTachometerAlt className="icon" /> Dashboard
                </li>
                <li onClick={() => navigate("/procurement/requests")}>
                    <FaClipboardList className="icon" /> Requests
                </li>
                <li onClick={() => navigate("/procurement")}>
                    <FaClipboardList className="icon" /> Procurement
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
            <style>{`
            /* Navbar Container */
            .navbar1 {
                width: 220px; /* Adjust width */
                height: 100vh;
                background-color: #ffffff;
                box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
                display: flex;
                flex-direction: column;
                padding-top: 20px;
            }

            /* Menu List */
            .user_bar {
                list-style: none;
                padding: 0;
                margin: 0;
            }

            /* Individual List Items */
            .user_bar li {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px 20px;
                font-size: 16px;
                color: #333;
                cursor: pointer;
                transition: background 0.3s ease-in-out;
            }

            /* Hover Effect */
            .user_bar li:hover {
                background-color: #e3f2fd; /* Light blue hover */
                border-left: 4px solid #007bff;
            }

            /* Icon Styling */
            .icon {
                font-size: 18px;
            }

            `}</style>
        </div>
    );
};

export default Navbar1;
