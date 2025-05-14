import React from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Procurements = () => {
  const reportData = [
    { label: "Total Procurement Requests", value: 320 },
    { label: "Approved Requests", value: 290 },
    { label: "Pending Requests", value: 30 },
    { label: "Budget Utilization", value: "85%" },
    { label: "Vendor Performance Score", value: "4.5/5" },
    { label: "Inventory Stock Level", value: "72%" },
  ];

  const exportCSV = () => {
    const csvRows = ["Metric,Value", ...reportData.map(row => `${row.label},${row.value}`)];
    const csvData = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(csvData);
    const link = document.createElement("a");
    link.href = url;
    link.download = "dashboard_report.csv";
    link.click();
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(reportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dashboard Report");
    XLSX.writeFile(workbook, "dashboard_report.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Dashboard Report", 14, 16);
    const tableData = reportData.map(row => [row.label, row.value]);
    doc.autoTable({ head: [["Metric", "Value"]], body: tableData, startY: 22 });
    doc.save("dashboard_report.pdf");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dashboard</h1>
      <p style={styles.description}>Overview of procurement activities.</p>

      <div style={styles.dashboardGrid}>
        {reportData.map((item, index) => (
          <div key={index} style={styles.card}>
            <h3 style={styles.cardTitle}>{item.label}</h3>
            <p style={styles.value}>{item.value}</p>
          </div>
        ))}
      </div>

      <div style={styles.exportContainer}>
        <h3 style={{ marginBottom: "10px" }}>Export Report</h3>
        <button style={styles.button} onClick={exportCSV}>Export CSV</button>
        <button style={styles.button} onClick={exportExcel}>Export Excel</button>
        <button style={styles.button} onClick={exportPDF}>Export PDF</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1100px",
    margin: "auto",
    padding: "30px",
    textAlign: "center",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#007bff",
  },
  description: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "20px",
  },
  dashboardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)", // 4 fixed columns
    gap: "16px",
  },
  card: {
    backgroundColor: "#f8f9fa",
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0 1px 6px rgba(0, 0, 0, 0.1)",
    minWidth: "180px",
    height: "140px",
    textAlign: "center",
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: "600",
    margin: 0,
  },
  value: {
    marginTop: "10px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#28a745",
  },
  exportContainer: {
    marginTop: "30px",
  },
  button: {
    margin: "0 8px",
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default Procurements;
