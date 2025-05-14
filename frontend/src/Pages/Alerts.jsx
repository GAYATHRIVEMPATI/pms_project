import React, { useState, useEffect } from "react";

// AlertCard component to display individual alert details
const AlertCard = ({ alert, onResolve }) => {
  return (
    <div
      style={{
        width: "100%",
        borderLeft: `6px solid ${alert.resolved ? "#2e8b57" : "#ffa500"}`,
        backgroundColor: alert.resolved ? "#e7f5ec" : "#fff8dc",
        border: "1px solid #f0c36d",
        borderRadius: "10px",
        padding: "20px",
        marginBottom: "20px",
        boxShadow: "2px 2px 6px rgba(0,0,0,0.1)",
        boxSizing: "border-box",
      }}
    >
      <h3 style={{ margin: 0, fontWeight: "bold" }}>{alert.title}</h3>
      <p style={{ margin: "10px 0", fontSize: "15px" }}>{alert.description}</p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <small style={{ fontSize: "13px", color: "#555" }}>{alert.dateTime}</small>
        {alert.resolved ? (
          <button
            style={{
              backgroundColor: "#2e8b57",
              color: "#fff",
              padding: "8px 14px",
              border: "none",
              borderRadius: "6px",
              cursor: "default",
              fontWeight: "bold",
            }}
            disabled
          >
            Resolved
          </button>
        ) : (
          <button
            style={{
              backgroundColor: "#d35400",
              color: "#fff",
              padding: "8px 14px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => onResolve(alert._id)}
          >
            Mark as Resolved
          </button>
        )}
      </div>
    </div>
  );
};

// Main Alerts component
const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAlerts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/alerts");
      const data = await res.json();
      if (data.success) {
        setAlerts(data.data);
      } else {
        console.error("Failed to fetch alerts:", data.message);
      }
    } catch (error) {
      console.error("Error fetching alerts:", error);
    } finally {
      setLoading(false);
    }
  };

  const resolveAlert = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/alerts/${id}/resolve`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.message === "Alert marked as resolved") {
        fetchAlerts();
      }
    } catch (error) {
      console.error("Error resolving alert:", error);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <div
      style={{
        width: "90%",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        padding: "40px 60px",
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ textAlign: "center", fontSize: "32px", fontWeight: "bold", marginBottom: "40px" }}>
        System Alerts
      </h1>

      {loading ? (
        <p>Loading alerts...</p>
      ) : alerts.length === 0 ? (
        <p>No alerts available</p>
      ) : (
        alerts.map((alert) => (
          <AlertCard key={alert._id} alert={alert} onResolve={resolveAlert} />
        ))
      )}
    </div>
  );
};

export default Alerts;
