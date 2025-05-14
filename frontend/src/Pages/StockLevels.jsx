import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DEFAULT_THRESHOLD = 10;

const StockLevels = () => {
  const [stockData, setStockData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("IT");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showOnlyLowStock, setShowOnlyLowStock] = useState(false);
  const [departments] = useState(["IT", "ECE", "EEE", "CSE", "MECH"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventoryData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:5000/api/items?department=${selectedDepartment}`
        );
        if (response.ok) {
          const data = await response.json();
          const items = data.flatMap((audit) =>
            audit.items.map((item) => ({
              ...item,
              threshold: item.threshold ?? DEFAULT_THRESHOLD,
            }))
          );
          setStockData(items);
          setFilteredData(items);
        } else {
          setError("Failed to fetch inventory data. Please try again.");
        }
      } catch (error) {
        setError("Error fetching data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInventoryData();
  }, [selectedDepartment]);

  useEffect(() => {
    let filtered = stockData.filter((item) =>
      item.itemType.toLowerCase().includes(categoryFilter.toLowerCase())
    );

    if (showOnlyLowStock) {
      filtered = filtered.filter(
        (item) => (item.functionalQty || 0) < item.threshold
      );
    }

    setFilteredData(filtered);
  }, [categoryFilter, stockData, showOnlyLowStock]);

  const updateThreshold = async (id, newThreshold) => {
    if (newThreshold <= 0) {
      setError("Threshold must be greater than 0.");
      return;
    }

    setStockData((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, threshold: newThreshold } : item
      )
    );

    try {
      await fetch(`http://localhost:5000/api/items/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ threshold: newThreshold }),
      });
    } catch (err) {
      setError("Failed to update threshold: " + err.message);
    }
  };

  const functionalSummary = {};
  const damagedSummary = {};
  let totalFunctional = 0;

  filteredData.forEach((item) => {
    const category = item.itemType;
    const functional = item.functionalQty || 0;
    const damaged = item.damagedQty || 0;
    totalFunctional += functional;

    functionalSummary[category] = (functionalSummary[category] || 0) + functional;
    damagedSummary[category] = (damagedSummary[category] || 0) + damaged;
  });

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };

  const barData = (summary, label, color) => ({
    labels: Object.keys(summary),
    datasets: [
      {
        label,
        data: Object.values(summary),
        backgroundColor: color,
      },
    ],
  });

  const styles = {
    container: {
      maxWidth: "1100px",
      margin: "30px auto",
      padding: "20px",
      minHeight: "70vh",
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
    heading: { textAlign: "center", color: "#222", marginBottom: "5px" },
    subtext: { textAlign: "center", marginBottom: "20px", color: "#666" },
    filters: {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "flex-end",
      flexWrap: "wrap",
      gap: "20px",
      marginBottom: "30px",
    },
    filterBox: {
      minWidth: "200px",
    },
    chartWrapper: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
      justifyContent: "center",
      margin: "20px 0",
    },
    chartBox: {
      flex: "1 1 400px",
      maxWidth: "400px",
      backgroundColor: "#f9f9f9",
      padding: "15px",
      borderRadius: "8px",
    },
    chartTitle: {
      textAlign: "center",
      fontWeight: "bold",
      marginBottom: "10px",
      color: "#333",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },
    th: {
      backgroundColor: "#007BFF",
      color: "#fff",
      padding: "10px",
      border: "1px solid #ccc",
    },
    td: {
      padding: "10px",
      border: "1px solid #ccc",
    },
    lowStock: {
      backgroundColor: "#ffe5e5",
      color: "red",
      fontWeight: "bold",
      textAlign: "center",
    },
    goodStock: {
      color: "green",
      fontWeight: "bold",
    },
    error: {
      color: "red",
      textAlign: "center",
      marginBottom: "10px",
    },
    summary: {
      textAlign: "center",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📊 Stock Levels</h2>
      <p style={styles.subtext}>Monitor stock levels and set reorder thresholds.</p>

      {error && <p style={styles.error}>{error}</p>}

      {/* Filters */}
      <div style={styles.filters}>
        <div style={styles.filterBox}>
          <label>Filter by Department:</label> <br />
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.filterBox}>
          <label>Search by Category:</label> <br />
          <input
            type="text"
            placeholder="e.g. Electronics"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          />
        </div>

        <div style={{ ...styles.filterBox, paddingTop: "22px" }}>
          <input
            type="checkbox"
            checked={showOnlyLowStock}
            onChange={(e) => setShowOnlyLowStock(e.target.checked)}
          />{" "}
          Show only low stock
        </div>
      </div>

      {/* Summary */}
      <div style={styles.summary}>
        <p>📌 <strong>Functional Stock Summary</strong></p>
        <p><strong>Total Functional Stock:</strong> {totalFunctional}</p>
      </div>

      {/* Charts */}
      <div style={styles.chartWrapper}>
        <div style={styles.chartBox}>
          <h3 style={styles.chartTitle}>Functional Stock by Category</h3>
          <Bar data={barData(functionalSummary, "Functional", "#6aa9ff")} options={chartOptions} />
        </div>
        <div style={styles.chartBox}>
          <h3 style={styles.chartTitle}>Damaged Stock by Category</h3>
          <Bar data={barData(damagedSummary, "Damaged", "#ffa07a")} options={chartOptions} />
        </div>
      </div>

      {/* Table */}
      {!loading && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>PO Number</th>
              <th style={styles.th}>Item Name</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Functional</th>
              <th style={styles.th}>Damaged</th>
              <th style={styles.th}>Total (Functional)</th>
              <th style={styles.th}>Threshold</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => {
                const functional = item.functionalQty || 0;
                return (
                  <tr key={item._id}>
                    <td style={styles.td}>{item.poNumber}</td>
                    <td style={styles.td}>{item.itemName}</td>
                    <td style={styles.td}>{item.itemType}</td>
                    <td style={styles.td}>{functional}</td>
                    <td style={styles.td}>{item.damagedQty || 0}</td>
                    <td
                      style={
                        functional < item.threshold
                          ? styles.lowStock
                          : styles.td
                      }
                    >
                      {functional}
                    </td>
                    <td style={styles.td}>
                      <input
                        type="number"
                        value={item.threshold}
                        min="1"
                        style={{ width: "60px" }}
                        onChange={(e) =>
                          updateThreshold(item._id, parseInt(e.target.value))
                        }
                      />
                    </td>
                    <td style={styles.td}>
                      {functional >= item.threshold ? (
                        <span style={styles.goodStock}>Good</span>
                      ) : (
                        <span style={styles.lowStock}>⚠️ Low Stock</span>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No matching stock items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StockLevels;
