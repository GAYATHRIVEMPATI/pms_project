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

      {/* Features Section */}
      <h2 style={styles.sectionTitle}>Features</h2>
      <ul style={styles.list}>
        <li><strong>Policy Enforcement:</strong> Validate procurement requests against defined policies.</li>
        <li><strong>Audit Logs:</strong> Maintain detailed logs of all procurement activities.</li>
        <li><strong>Regulatory Reporting:</strong> Generate reports required for compliance with governmental or institutional regulations.</li>
      </ul>

      {/* Functional Requirements */}
      <h2 style={styles.sectionTitle}>Functional Requirements</h2>

      <h3 style={styles.subTitle}>Policy Enforcement</h3>
      <ul style={styles.list}>
        <li>Validate procurement requests based on:
          <ul>
            <li>Defined financial limits per department or user role.</li>
            <li>Approved vendor lists.</li>
            <li>Allowable item categories.</li>
            <li>Specific university guidelines (e.g., environmental or sustainability requirements).</li>
          </ul>
        </li>
        <li>Display clear error messages when requests violate policies.</li>
        <li>Maintain a record of policy violations for audit purposes.</li>
      </ul>

      <h3 style={styles.subTitle}>Audit Logs</h3>
      <ul style={styles.list}>
        <li>Track all procurement-related activities:
          <ul>
            <li>User actions (e.g., request submission, approval, rejection).</li>
            <li>Vendor interactions (e.g., quotation submission, PO acceptance).</li>
            <li>System-generated events (e.g., notifications, threshold breaches).</li>
          </ul>
        </li>
        <li>Include details for each log entry:
          <ul>
            <li>User ID, timestamp, action type, and affected data.</li>
            <li>IP address and device information (if available).</li>
          </ul>
        </li>
        <li>Allow filtering and searching through logs by date, user, or action type.</li>
      </ul>

      <h3 style={styles.subTitle}>Regulatory Reporting</h3>
      <ul style={styles.list}>
        <li>Generate compliance reports:
          <ul>
            <li>Financial reporting for procurement activities exceeding a specific value.</li>
            <li>Vendor diversity reporting (e.g., percentage of contracts with small businesses).</li>
            <li>Environmental impact of procurement (e.g., recycled materials percentage).</li>
          </ul>
        </li>
        <li>Support predefined and custom report formats.</li>
        <li>Automate scheduled reporting for regulatory deadlines.</li>
      </ul>
    </div>
  );
};

// 🔹 Styling
const styles = {
  container: {
    maxWidth: "1000px",
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
