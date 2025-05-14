import React from "react";
import { FileText, TrendingUp, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Reports() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-wrapper">
      <h1>Reports & Analytics</h1>

      <div className="card-container">
        {/* Procurement Card */}
        <div className="dash-card" onClick={() => handleNavigate("/admin/reports/procurement")}>
          <div className="icon-circle blue">
            <ShoppingCart size={32} color="#fff" />
          </div>
          <p>Procurement</p>
        </div>

        {/* Trends Card */}
        <div className="dash-card" onClick={() => handleNavigate("/admin/reports/trends")}>
          <div className="icon-circle purple">
            <TrendingUp size={32} color="#fff" />
          </div>
          <p>Trends</p>
        </div>

        {/* Reports Card */}
        <div className="dash-card" onClick={() => handleNavigate("/admin/reports/sub-reports")}>
          <div className="icon-circle green">
            <FileText size={32} color="#fff" />
          </div>
          <p>Reports</p>
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

.dropdown-container {
  margin-bottom: 30px;
}

.dept-dropdown {
  padding: 12px 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  width: 260px;
}

/* Cards container */
.card-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 25px;
}

/* Individual card */
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

/* Icon circle styling */
.icon-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
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

/* Card text */
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

export default Reports;
