import React from "react";
import { useNavigate } from "react-router-dom";

const CompilanceAudit = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* 🔹 Top Navigation Buttons */}
      <div style={styles.navButtons}>
        <button style={styles.navButton} onClick={() => navigate("/admin/compilance-audit/audit-procurement")}>Procurement</button>
        <button style={styles.navButton} onClick={() => navigate("/admin/compilance-audit/audit")}>Audit</button>
        <button style={styles.navButton} onClick={() => navigate("/admin/compilance-audit/audit-reports")}>Reports</button>
        <button style={styles.navButton} onClick={() => navigate("/admin/compilance-audit/audit-policies")}>Policies</button>
      </div>

      <h1 style={styles.title}>Compliance & Audit Management</h1>
      <p style={styles.description}>
        Ensures adherence to university policies and regulatory requirements.
      </p>
    </div>
  );
};

// 🔹 Styling
const styles = {
  container: {
    maxWidth: "1000px",
    width:"700px",
    height: "200px",
    margin: "auto",
    padding: "30px",
    backgroundColor: "#fffbe6",
    borderRadius: "10px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
  },
  navButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  navButton: {
    padding: "8px 16px",
    backgroundColor: "#8B4513",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#8B4513",
    marginBottom: "15px",
  },
  description: {
    textAlign: "center",
    fontSize: "16px",
    color: "#555",
    marginBottom: "20px",
  },
  sectionTitle: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#5a3d1b",
    marginTop: "20px",
  },
  subTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#8B4513",
    marginTop: "15px",
  },
  list: {
    paddingLeft: "20px",
    fontSize: "16px",
    lineHeight: "1.6",
    color: "#333",
  },
};

export default CompilanceAudit;
