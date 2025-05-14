import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import html2pdf from "html2pdf.js";

const InventoryReports = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [departments] = useState([
    { name: "IT" },
    { name: "ECE" },
    { name: "EEE" },
    { name: "CSE" },
    { name: "MECH" },
  ]);
  const [selectedDepartment, setSelectedDepartment] = useState("IT");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/items?department=${selectedDepartment}`
        );
        if (response.data && Array.isArray(response.data[0]?.items)) {
          setInventoryData(response.data[0].items);
        } else {
          setError("No inventory items found for this department.");
        }
      } catch (error) {
        console.error("Error fetching items:", error);
        setError("Failed to fetch inventory data.");
      }
    };
    fetchItems();
  }, [selectedDepartment]);

  const exportToPDF = () => {
    const element = document.getElementById("report-content");
    html2pdf().from(element).save(`${selectedDepartment}_Inventory_Report.pdf`);
  };

  const exportToExcel = () => {
    const data = [
      [
        "PO Number",
        "Item Type",
        "Item Name",
        "Variant",
        "Department",
        "Description",
        "Quantity",
      ],
      ...inventoryData.map((item) => [
        item.poNumber,
        item.itemType,
        item.itemName,
        item.itemVariant,
        item.department,
        item.itemDescription,
        item.functionalQty || 0,
      ]),
    ];
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Inventory Report");
    XLSX.writeFile(wb, `${selectedDepartment}_Inventory_Report.xlsx`);
  };

  const styles = {
    pageWrapper: {
      display: "flex",
      justifyContent: "center",
      padding: "30px 0",
      backgroundColor: "#f8f9fc",
      minHeight: "100vh",
     
    },
    container: {
      margin: "30px auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      minHeight: "70vh",
      backgroundColor: "white",
      padding: "20px 20px",
      
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: "12px",
      padding: "35px",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
      width: "90%",
      maxWidth: "1200px",
    },
    title: {
      fontSize: "26px",
      fontWeight: "700",
      color: "#2c3e50",
      textAlign: "center",
      marginBottom: "10px",
    },
    description: {
      fontSize: "16px",
      color: "#6c757d",
      textAlign: "center",
      marginBottom: "30px",
    },
    select: {
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #ced4da",
      width: "100%",
      fontSize: "16px",
      marginBottom: "25px",
    },
    reportBox: {
      background: "#ffffff",
      borderRadius: "10px",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.06)",
      padding: "25px",
      marginBottom: "25px",
      overflowX: "auto",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: "15px",
    },
    th: {
      background: "#007bff",
      color: "#ffffff",
      padding: "12px",
      textAlign: "left",
      borderBottom: "2px solid #dee2e6",
      position: "sticky",
      top: 0,
      zIndex: 1,
    },
    td: {
      padding: "12px",
      borderBottom: "1px solid #e9ecef",
      textAlign: "left",
      backgroundColor: "#fff",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      marginTop: "25px",
      flexWrap: "wrap",
    },
    pdfButton: {
      backgroundColor: "#e74c3c",
      color: "#fff",
      border: "none",
      padding: "12px 24px",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      transition: "background-color 0.3s ease",
    },
    excelButton: {
      backgroundColor: "#28a745",
      color: "#fff",
      border: "none",
      padding: "12px 24px",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      transition: "background-color 0.3s ease",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          <span role="img" aria-label="document">📄</span> Inventory Reports
        </h2>
        <p style={styles.description}>
          Generate and export inventory reports in <b>PDF</b> or <b>Excel</b>.
        </p>

        <select
          style={styles.select}
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          {departments.map((dept, index) => (
            <option key={index} value={dept.name}>
              {dept.name}
            </option>
          ))}
        </select>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <div id="report-content" style={styles.reportBox}>
          <h3 style={{ marginBottom: "15px" }}>
            {selectedDepartment} Inventory Report
          </h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>PO Number</th>
                <th style={styles.th}>Item Type</th>
                <th style={styles.th}>Item Name</th>
                <th style={styles.th}>Variant</th>
                <th style={styles.th}>Department</th>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((item, index) => (
                <tr key={index}>
                  <td style={styles.td}>{item.poNumber}</td>
                  <td style={styles.td}>{item.itemType}</td>
                  <td style={styles.td}>{item.itemName}</td>
                  <td style={styles.td}>{item.itemVariant}</td>
                  <td style={styles.td}>{item.department}</td>
                  <td style={styles.td}>{item.itemDescription}</td>
                  <td style={styles.td}>{item.functionalQty || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={styles.buttonContainer}>
          <button
            onClick={exportToPDF}
            style={styles.pdfButton}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#c0392b")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#e74c3c")}
          >
            📄 Export PDF
          </button>
          <button
            onClick={exportToExcel}
            style={styles.excelButton}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#218838")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#28a745")}
          >
            📊 Export Excel
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryReports;
