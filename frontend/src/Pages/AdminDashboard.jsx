import React from "react";
import {
  FaUsers,
  FaBuilding,
  FaClipboardList,
  FaFileAlt,
  FaChartBar,
  FaShoppingCart,
} from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="summary-section1">

        {/* Total Users Card */}
        <div className="card total-users">
          <div className="card-header">
            <FaUsers className="dashboard-icon total-icon" />
            <span className="card-title">Total Users</span>
          </div>
          <div className="card-count">
            <span>Count:</span> <span className="card-value">500</span>
          </div>
        </div>

        {/* Total Vendors Card */}
        <div className="card total-vendors">
          <div className="card-header">
            <FaBuilding className="dashboard-icon vendor-icon" />
            <span className="card-title">Total Vendors</span>
          </div>
          <div className="card-count">
            <span>Count:</span> <span className="card-value">120</span>
          </div>
        </div>

        {/* Total Requests Card */}
        <div className="card total-requests">
          <div className="card-header">
            <FaClipboardList className="dashboard-icon requests-icon" />
            <span className="card-title">Total Requests</span>
          </div>
          <div className="card-count">
            <span>Count:</span> <span className="card-value">1500</span>
          </div>
        </div>

        {/* Quotations Card */}
        <div className="card quotations">
          <div className="card-header">
            <FaFileAlt className="dashboard-icon quotations-icon" />
            <span className="card-title">Quotations</span>
          </div>
          <div className="card-count">
            <span>Count:</span> <span className="card-value">50</span>
          </div>
        </div>

        {/* Reports Card */}
        <div className="card reports">
          <div className="card-header">
            <FaChartBar className="dashboard-icon reports-icon" />
            <span className="card-title">Reports</span>
          </div>
          <div className="card-count">
            <span>Count:</span> <span className="card-value">80</span>
          </div>
        </div>

        {/* Purchase Orders Card */}
        <div className="card purchase-orders">
          <div className="card-header">
            <FaShoppingCart className="dashboard-icon orders-icon" />
            <span className="card-title">Purchase Orders</span>
          </div>
          <div className="card-count">
            <span>Count:</span> <span className="card-value">200</span>
          </div>
        </div>

      </div>

      {/* INTERNAL CSS */}
      <style>{`
        .dashboard-container {
          width: calc(100vw - 220px);
          height: calc(100vh - 120px);
          padding: 20px;
          background-color: #FFFFFF;
          overflow-y: auto;
        }

        .summary-section1 {
          display: flex;
          flex-wrap: wrap;
          gap: 60px;
          margin-bottom: 20px;
          justify-content: flex-start;
        }

        .card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          width: calc((100% - 40px) / 4);
          min-width: 220px;
          text-align: center;
          font-size: 16px;
          font-weight: bold;
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
        }

        .dashboard-icon {
          font-size: 24px;
        }

        .card-count {
          margin-top: 5px;
          font-size: 18px;
          font-weight: bold;
        }

        .card-value {
          font-size: 20px;
          font-weight: bold;
          margin-left: 5px;
          color: black;
        }

        /* Admin Card Colors */
        .total-users { background: #e0f7fa; color: #00796b; }
        .total-vendors { background: #f1f8e9; color: #689f38; }
        .total-requests { background: #fdecec; color: #f56565; }
        .quotations { background: #fff3e0; color: #f4ad42; }
        .reports { background: #e3f2fd; color: #2196f3; }
        .purchase-orders { background: #f0f4c3; color: #827717; }

        /* Icon Colors */
        .total-icon { color: #00796b; }
        .vendor-icon { color: #689f38; }
        .requests-icon { color: #f56565; }
        .quotations-icon { color: #f4ad42; }
        .reports-icon { color: #2196f3; }
        .orders-icon { color: #827717; }
      `}</style>

    </div>
  );
};

export default AdminDashboard;
