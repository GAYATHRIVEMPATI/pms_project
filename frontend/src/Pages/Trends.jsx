import React from "react";

const Trends = () => {
  const trendMetrics = [
    { title: "Yearly Procurement Growth", value: "+15%" },
    { title: "Monthly Expenditure Trend", value: "$120,000" },
    { title: "Top Purchased Categories", value: "Office Supplies, IT Equipment" },
    { title: "Seasonal Demand Peaks", value: "Q3 & Q4" },
    { title: "Cost-Saving Initiatives", value: "Reduced Waste, Bulk Orders" },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Procurement Trends</h1>
      <p style={styles.description}>Analyze trends in procurement activities over time.</p>

      <div style={styles.grid}>
        {trendMetrics.map((metric, index) => (
          <div key={index} style={styles.card}>
            <h3 style={styles.cardTitle}>{metric.title}</h3>
            <p style={styles.cardValue}>{metric.value}</p>
          </div>
        ))}
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
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)", // 4 columns
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
  cardValue: {
    marginTop: "10px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#28a745",
  },
};

export default Trends;
