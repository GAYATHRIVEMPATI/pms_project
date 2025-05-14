import React from "react";
import {
  FileBarChart2,
  Layers,
  Package,
  PlusCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Inventory() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-wrapper">
      <h1>Inventory Management</h1>

      <div className="card-container">
        {/* Inventory Reports Card */}
        <div className="dash-card" onClick={() => handleNavigate("/admin/inventory/inventory-reports")}>
          <div className="icon-circle orange">
            <FileBarChart2 size={32} color="#fff" />
          </div>
          <p>Inventory Reports</p>
        </div>

        {/* Stock Levels Card */}
        <div className="dash-card" onClick={() => handleNavigate("/admin/inventory/stock-levels")}>
          <div className="icon-circle blue">
            <Layers size={32} color="#fff" />
          </div>
          <p>Stock Levels</p>
        </div>

        {/* Inventory Page Card */}
        <div className="dash-card" onClick={() => handleNavigate("/admin/inventory/inventory-page")}>
          <div className="icon-circle purple">
            <Package size={32} color="#fff" />
          </div>
          <p>Inventory Page</p>
        </div>

        {/* Item Entry Card */}
        <div className="dash-card" onClick={() => handleNavigate("/admin/inventory/item-entry")}>
          <div className="icon-circle green">
            <PlusCircle size={32} color="#fff" />
          </div>
          <p>Item Entry</p>
        </div>
      </div>

      <style>{`
        .dashboard-wrapper {
          padding: 30px;
          text-align: center;
          max-width: 1000px;
          margin: 0 auto;
        }

        .dashboard-wrapper h1 {
          font-size: 32px;
          color: #333;
          margin-bottom: 30px;
        }

        .card-container {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 25px;
        }

        .dash-card {
          width: 200px;
          height: 160px;
          background-color: #f4f4f4;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          padding: 25px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .dash-card:hover {
          background-color: #e0e0e0;
        }

        .icon-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
        }

        .icon-circle.orange {
          background-color: #ffa726;
        }

        .icon-circle.blue {
          background-color: #42a5f5;
        }

        .icon-circle.purple {
          background-color: #ab47bc;
        }

        .icon-circle.green {
          background-color: #66bb6a;
        }

        .dash-card p {
          margin: 0;
          font-size: 18px;
          font-weight: 500;
          color: #333;
        }
      `}</style>
    </div>
  );
}

export default Inventory;
