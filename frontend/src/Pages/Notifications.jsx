import React from "react";
import { Mail, MessageSquareText, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Notifications() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-wrapper">
      <h1>Notifications Center</h1>

      <div className="card-container">
        {/* Email Notifications */}
        <div
          className="dash-card"
          onClick={() => handleNavigate("/admin/notifications/notifications-procurement")}
        >
          <div className="icon-circle blue">
            <Mail size={32} color="#fff" />
          </div>
          <p>Email Notifications</p>
        </div>

        {/* In-App Messaging */}
        <div
          className="dash-card"
          onClick={() => handleNavigate("/admin/notifications/chat-box")}
        >
          <div className="icon-circle purple">
            <MessageSquareText size={32} color="#fff" />
          </div>
          <p>In-App Messaging</p>
        </div>

        {/* Alerts */}
        <div
          className="dash-card"
          onClick={() => handleNavigate("/admin/notifications/alerts")}
        >
          <div className="icon-circle green">
            <Bell size={32} color="#fff" />
          </div>
          <p>Alerts</p>
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

export default Notifications;
