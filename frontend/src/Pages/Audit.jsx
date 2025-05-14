import React, { useState, useEffect } from "react";

const Audit = () => {
  // State for audit logs
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortColumn, setSortColumn] = useState("timestamp");
  const [sortOrder, setSortOrder] = useState("desc");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Fetch audit logs from API
  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/audit-logs");
        const data = await response.json();
        setLogs(data);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchAuditLogs();
  }, []);

  // Filter logs based on search and filter parameters
  const filteredLogs = logs
    .filter((log) => {
      if (filterType !== "all" && !log.action.includes(filterType)) return false;
      if (
        searchTerm &&
        !log.userId.includes(searchTerm) &&
        !log.action.toLowerCase().includes(searchTerm.toLowerCase())
      )
        return false;
      if (startDate && new Date(log.timestamp) < new Date(startDate)) return false;
      if (endDate && new Date(log.timestamp) > new Date(endDate)) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") return new Date(a[sortColumn]) - new Date(b[sortColumn]);
      return new Date(b[sortColumn]) - new Date(a[sortColumn]);
    });

  return (
    <div style={darkMode ? styles.darkContainer : styles.container}>
      <h1 style={styles.title}>Audit Logs</h1>

      {/* Filter Options */}
      <div style={styles.filterContainer}>
        <input
          type="text"
          placeholder="🔍 Search by User ID or Action..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
        />
        <select onChange={(e) => setFilterType(e.target.value)} style={styles.input}>
          <option value="all">All Actions</option>
          <option value="Request Submitted">Request Submitted</option>
          <option value="Approval Granted">Approval Granted</option>
          <option value="Request Rejected">Request Rejected</option>
          <option value="Vendor Quotation Submitted">Vendor Quotation Submitted</option>
          <option value="Threshold Breach Alert">Threshold Breach Alert</option>
        </select>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={styles.input} />
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={styles.input} />
      </div>

      {/* Audit Log Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th onClick={() => setSortColumn("userId")}>User ID</th>
            <th onClick={() => setSortColumn("timestamp")}>Timestamp</th>
            <th>Action</th>
            <th>Affected Data</th>
            <th>IP Address</th>
            <th>Device</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.length > 0 ? (
            filteredLogs.map((log, index) => (
              <tr key={index}>
                <td>{log.userId}</td>
                <td>{log.timestamp}</td>
                <td>{log.action}</td>
                <td>{log.affectedData}</td>
                <td>{log.ip}</td>
                <td>{log.device}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={styles.noResults}>No records found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// 🎨 Styled UI Components
const styles = {
  container: {
    maxWidth: "1000px",
    margin: "auto",
    padding: "30px",
    backgroundColor: "#fffbe6",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
  darkContainer: {
    maxWidth: "700px",
    margin: "auto",
    padding: "30px",
    backgroundColor: "#2c2c2c",
    color: "white",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.6)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#8B4513",
  },
  filterContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
    gap: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #8B4513",
    fontSize: "12px",
    flex: 1,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "15px",
  },
  noResults: {
    textAlign: "center",
    color: "red",
    fontWeight: "bold",
    padding: "15px",
  },
};

export default Audit;
