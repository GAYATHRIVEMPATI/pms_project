import React from "react";
import { FaClipboardList, FaCheckCircle, FaClock, FaTimesCircle, FaRupeeSign } from "react-icons/fa"; // Use INR symbol icon
import "./Dashboard.css";  

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      
      {/* Requests Summary Section */}
      <h2 className="section-title">Requests</h2>
      <div className="summary-section">
        <div className="card total-requests">
          <div className="card-header">
            <FaClipboardList className="dashboard-icon total-icon" />
            <span className="card-title">Total Requests</span>
          </div>
          <div className="card-count">
            <span>Count:</span> <span className="card-value">1200</span>
          </div>
        </div>

        <div className="card approved-requests">
          <div className="card-header">
            <FaCheckCircle className="dashboard-icon approved-icon" />
            <span className="card-title">Approved Requests</span>
          </div>
          <div className="card-count">
            <span>Count:</span> <span className="card-value">720</span>
          </div>
        </div>

        <div className="card pending-requests">
          <div className="card-header">
            <FaClock className="dashboard-icon pending-icon" />
            <span className="card-title">Pending Approvals</span>
          </div>
          <div className="card-count">
            <span>Count:</span> <span className="card-value">360</span>
          </div>
        </div>

        <div className="card rejected-requests">
          <div className="card-header">
            <FaTimesCircle className="dashboard-icon rejected-icon" />
            <span className="card-title">Rejected Requests</span>
          </div>
          <div className="card-count">
            <span>Count:</span> <span className="card-value">120</span>
          </div>
        </div>
      </div>

      {/* Budget Summary Section */}
      <h2 className="section-title">Budgets</h2>
      <div className="summary-section">
        <div className="card total-budget">
          <div className="card-header">
            <FaRupeeSign className="dashboard-icon budget-icon" />
            <span className="card-title">Total Budget</span>
          </div>
          <div className="card-count">
            <span>Amount:</span> <span className="card-value">₹50,00,000</span>
          </div>
        </div>

        <div className="card spent-budget">
          <div className="card-header">
            <FaRupeeSign className="dashboard-icon spent-icon" />
            <span className="card-title">Spent Budget</span>
          </div>
          <div className="card-count">
            <span>Amount:</span> <span className="card-value">₹30,00,000</span>
          </div>
        </div>

        <div className="card remaining-budget">
          <div className="card-header">
            <FaRupeeSign className="dashboard-icon remaining-icon" />
            <span className="card-title">Remaining Budget</span>
          </div>
          <div className="card-count">
            <span>Amount:</span> <span className="card-value">₹20,00,000</span>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
