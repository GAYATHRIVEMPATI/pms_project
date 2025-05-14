import React, { useEffect, useState } from "react";
import axios from "axios";

const AuditProcurement = () => {
  const [procurementRequests, setProcurementRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDepartment, setFilterDepartment] = useState("all");

  // Fetch data from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/procurements")
      .then(res => setProcurementRequests(res.data))
      .catch(err => console.error("Failed to fetch procurement data:", err));
  }, []);

  const filteredRequests = procurementRequests.filter(request => {
    return (
      (filterStatus === "all" || request.status === filterStatus) &&
      (filterDepartment === "all" || request.department === filterDepartment) &&
      (request.id.includes(searchTerm) || request.vendor.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Procurement Requests</h1>

      

      <h3 style={styles.subTitle}>Filter & Search Requests</h3>
      <div style={styles.filterContainer}>
        <input
          type="text"
          placeholder="Search by Request ID or Vendor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
        />
        <select onChange={(e) => setFilterStatus(e.target.value)} style={styles.input}>
          <option value="all">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <select onChange={(e) => setFilterDepartment(e.target.value)} style={styles.input}>
          <option value="all">All Departments</option>
          <option value="IT">IT</option>
          <option value="ECE">ECE</option>
          <option value="CSE">CSE</option>
          <option value="EEE">EEE</option>
          <option value="Civil">Civil</option>
          <option value="Mechanical">Mechanical</option>
        </select>
      </div>

      <h3 style={styles.subTitle}>Procurement Requests Table</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Department</th>
            <th>Vendor</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <tr key={request._id}>
                <td>{request.id}</td>
                <td>{request.department}</td>
                <td>{request.vendor}</td>
                <td>${request.amount}</td>
                <td style={{ ...styles.status, ...styles[request.status.toLowerCase()] }}>{request.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={styles.noResults}>No matching requests found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// 🎨 Stylish UI
const styles = {
  container: {
    maxWidth: "700px",
    width: "90%",
    margin: "auto",
    padding: "30px",
    backgroundColor: "#fffbe6",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#8B4513",
  },
  subTitle: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#5a3d1b",
    marginTop: "20px",
  },
  list: {
    paddingLeft: "20px",
    fontSize: "12px",
    lineHeight: "1.6",
    color: "#333",
  },
  filterContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #8B4513",
    fontSize: "12px",
    backgroundColor: "#fff",
    flex: 1,
    marginRight: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "15px",
  },
  th: {
    backgroundColor: "#8B4513",
    color: "white",
    padding: "10px",
    textAlign: "left",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #ddd",
  },
  status: {
    padding: "6px 12px",
    borderRadius: "6px",
    fontWeight: "bold",
    textAlign: "center",
  },
  pending: {
    backgroundColor: "#FFD700",
    color: "black",
  },
  approved: {
    backgroundColor: "#32CD32",
    color: "white",
  },
  rejected: {
    backgroundColor: "#FF4500",
    color: "white",
  },
  noResults: {
    textAlign: "center",
    color: "red",
    fontWeight: "bold",
    padding: "15px",
  },
};

export default AuditProcurement;
