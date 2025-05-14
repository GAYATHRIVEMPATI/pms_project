import React from "react";
import { FaClipboardList, FaCheckCircle, FaClock, FaTimesCircle, FaRupeeSign } from "react-icons/fa"; // Use INR symbol icon

const Dashboard = () => {
  return (
    <div className="dashboard-containers">
      
      {/* Requests Summary Section */}
      <h2 className="section-titles">Requests</h2>
      <div className="summary-sections">
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
      <h2 className="section-titles">Budgets</h2>
      <div className="summary-sections">
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
      <style>{`
          .dashboard-contain {
          width: calc(100vw - 220px);
          height: calc(100vh - 120px);
          padding: 10px 10px 10px 10px;
          margin-left: 20px;
          margin-right: 20px;
          background-color: #FFFFFF;
          overflow-y: auto;
      }

      /* Section Titles */
      .section-titles {
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 10px;
          padding-top: 20px;
          text-align: left;
      }

      /* Summary Cards */
      .summary-sections {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
      }

      /* Card Styles */
      .card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 15px;
          margin-left: 5px;;
          border-radius: 8px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          width: 220px;
          text-align: center;
          font-size: 16px;
          font-weight: bold;
      }

      /* Header: Icon & Title on the same line */
      .card-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
      }

      /* Icons */
      .dashboard-icon {
          font-size: 24px;
      }

      /* Count/Amount on the second line */
      .card-count {
          margin-top: 5px;
          font-size: 18px;
          font-weight: bold;
      }

      /* Values */
      .card-value {
          font-size: 20px;
          font-weight: bold;
          margin-left: 5px;
          color: black;
      }

      /* Requests Card Colors */
      .total-requests { background: #fdecec; color: #f56565; }
      .approved-requests { background: #e7f7e7; color: #249624; }
      .pending-requests { background: #fef4e5; color: #f4ad42; }
      .rejected-requests { background: #fde8e8; color: #ef6161; }

      /* Budget Card Colors */
      .total-budget { background: #fdecec; color: #f56565; }
      .spent-budget { background: #fff3e0; color: #f4ad42; }
      .remaining-budget { background: #e8f5e9; color: #249624; }

      /* Icon Colors */
      .total-icon { color: #f56565; }
      .approved-icon { color: #249624; }
      .pending-icon { color: #f4ad42; }
      .rejected-icon { color: #ef6161; }

      .budget-icon { color: #f56565; }
      .spent-icon { color: #f4ad42; }
      .remaining-icon { color: #249624; }

      `}</style>
    </div>
  );
};

export default Dashboard;
