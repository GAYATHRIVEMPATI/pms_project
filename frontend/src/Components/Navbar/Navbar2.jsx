import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaClipboardList, FaChartBar, FaUsers, FaEnvelope, FaCog, FaUserShield } from "react-icons/fa";

const Navbar2 = () => {
    const navigate = useNavigate(); // Initialize navigate function

    return (
        <div className="navbar2">
            <ul className="admin_bar">
                <li onClick={() => navigate("/admin/dashboard")}>
                    <FaTachometerAlt className="icon" /> Dashboard
                </li>
                <li onClick={() => navigate("/admin/requests")}>
                    <FaClipboardList className="icon" /> Requests
                </li>
                <li onClick={() => navigate("/admin/procurement")}>
                    <FaClipboardList className="icon" /> Procurement
                </li>
                <li onClick={() => navigate("/admin/budget")}>
                    <FaChartBar className="icon" /> Budgets
                </li>
                <li onClick={() => navigate("/admin/users")}>
                    <FaUsers className="icon" /> Users
                </li>
                <li onClick={() => navigate("/admin/vendors")}>
                    <FaUsers className="icon" /> Vendors
                </li>
                <li onClick={() => navigate("/admin/quotations")}>
                    <FaClipboardList className="icon" /> Quotations
                </li>
                <li onClick={() => navigate("/admin/inventory")}>
                    <FaClipboardList className="icon" /> Inventory
                </li>
                <li onClick={() => navigate("/admin/reports")}>
                    <FaChartBar className="icon" /> Reports
                </li>
                <li onClick={() => navigate("/admin/compilance-audit")}>
                    <FaEnvelope className="icon" /> Compilance & Audit
                </li>
                <li onClick={() => navigate("/admin/notifications")}>
                    <FaUserShield className="icon" /> Notifications
                </li>
                <li onClick={() => navigate("/admin/settings")}>
                    <FaCog className="icon" /> Settings
                </li>
            </ul>
            <style>{`
            /* Navbar Container */
            .navbar2 {
                width: 250px; /* Adjust width */
                height: 100vh;
                background-color: #f5f5f5; /* Light background color */
                box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
                display: flex;
                flex-direction: column;
                padding-top: 20px;
            }

            /* Menu List */
            .admin_bar {
                list-style: none;
                padding: 0;
                margin: 0;
            }

            /* Individual List Items */
            .admin_bar li {
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
            .admin_bar li:hover {
                background-color: #e3f2fd; /* Light blue hover */
                border-left: 4px solid #007bff;
            }

            /* Icon Styling */
            .icon {
                font-size: 18px;
            }

            /* Active State */
            .admin_bar li.active {
                background-color: #007bff;
                color: #fff;
                border-left: 4px solid #0056b3;
            }

            .admin_bar li.active:hover {
                background-color: #0056b3;
            }

            `}</style>
        </div>
    );
};

export default Navbar2;
