import React, { useState, useEffect } from "react";

const InventoryPage = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventoryData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:5000/api/items?department=${selectedDepartment}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setInventoryData(data);
      } catch (err) {
        setError("Failed to fetch inventory data.");
      } finally {
        setLoading(false);
      }
    };

    fetchInventoryData();
  }, [selectedDepartment]);

  const filteredInventory = inventoryData
    .flatMap((audit) => audit.items)
    .filter((item) =>
      item.itemName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const styles = {
    body: {
      fontFamily: "Arial, sans-serif",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      width: "90%",
    },
    container: {
      width: "90%",
      maxWidth: "1200px",
      margin: "30px auto",
      background: "white",
      padding: "20px",
      marginTop: "20px",
      borderRadius: "10px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      boxSizing: "border-box",
      overflowX: "auto",
    },
    heading: {
      textAlign: "center",
      color: "#333",
      fontSize: "24px",
      marginBottom: "20px",
    },
    filters: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "10px",
      marginBottom: "20px",
    },
    selectInput: {
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      tableLayout: "auto",
    },
    thTd: {
      border: "1px solid #ddd",
      padding: "10px",
      textAlign: "left",
    },
    th: {
      backgroundColor: "#007BFF",
      color: "white",
    },
    lowStock: {
      backgroundColor: "#ffcccc",
      color: "red",
      fontWeight: "bold",
    },
    highStock: {
      backgroundColor: "#ccffcc",
      color: "green",
      fontWeight: "bold",
    },
    row: (index) => ({
      backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
    }),
    message: {
      textAlign: "center",
      color: "#666",
      fontStyle: "italic",
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h2 style={styles.heading}>📦 Inventory Management</h2>

        <div style={styles.filters}>
          <div>
            <label>Filter by Department: </label>
            <select
              style={styles.selectInput}
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="All">All Departments</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="CSE">CSE</option>
              <option value="MECH">MECH</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Search items..."
            style={styles.selectInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <p style={styles.message}>Loading inventory data...</p>
        ) : error ? (
          <p style={{ ...styles.message, color: "red" }}>{error}</p>
        ) : (
          <>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>PO Number</th>
                  <th style={styles.th}>Item Name</th>
                  <th style={styles.th}>Category</th>
                  <th style={styles.th}>Stock</th>
                  <th style={styles.th}>Department</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.length > 0 ? (
                  filteredInventory.map((item, index) => {
                    const style =
                      item.functionalQty <= item.threshold
                        ? styles.lowStock
                        : item.functionalQty >= 50
                        ? styles.highStock
                        : styles.row(index);

                    return (
                      <tr key={item._id} style={style}>
                        <td style={styles.thTd}>{item.poNumber}</td>
                        <td style={styles.thTd}>{item.itemName}</td>
                        <td style={styles.thTd}>{item.itemType}</td>
                        <td style={styles.thTd}>{item.functionalQty}</td>
                        <td style={styles.thTd}>{item.department}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" style={styles.thTd}>
                      No items found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <p style={{ textAlign: "right", marginTop: "10px", color: "#555" }}>
              Showing {filteredInventory.length} item
              {filteredInventory.length !== 1 ? "s" : ""}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default InventoryPage;
