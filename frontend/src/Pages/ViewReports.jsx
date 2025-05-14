import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../Context/AppContext";

function ViewReports() {
  const [allReports, setAllReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);

  const [productId, setProductId] = useState("");
  const [category, setCategory] = useState("");
  const { selectedDepartment } = useAppContext();

  // Fetch reports from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/reports")
      .then(res => setAllReports(res.data))
      .catch(err => console.error("Error fetching reports:", err));
  }, []);

  // Apply filtering logic
  useEffect(() => {
    let filtered = allReports;

    if (selectedDepartment) {
      filtered = filtered.filter(
        (report) => report.department === selectedDepartment
      );
    }

    if (productId) {
      filtered = filtered.filter((report) =>
        report.productId.toLowerCase().includes(productId.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter((report) => report.category === category);
    }

    setFilteredReports(filtered);
  }, [allReports, selectedDepartment, productId, category]);

  // Reset Filters
  const resetFilters = () => {
    setProductId("");
    setCategory("");
  };

  return (
    <div className="recurring-wrapper">
      <h2 className="page-title">Procurement Budget Reports</h2>
      <h3 className="selected-dept">
        Selected Department: {selectedDepartment || "None"}
      </h3>

      {/* Filter Bar */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="Recurring">Recurring</option>
          <option value="Non Recurring">Non Recurring</option>
        </select>

        <button onClick={resetFilters}>Reset Filters</button>
      </div>

      {/* Reports Table */}
      <table className="product-table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Expenditure</th>
            <th>Remaining</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <tr key={report._id}>
                <td>{report.productId}</td>
                <td>{report.productName}</td>
                <td>{report.category}</td>
                <td>{report.expenditureAmount}</td>
                <td>{report.remainingAmount}</td>
                <td>{report.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">
                No reports found for {selectedDepartment || "any department"}.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <style>{`
      .view-reports-wrapper {
    margin: 20px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  .filter-bar {
    margin-bottom: 20px;
    display: flex;
    gap: 10px;
  }
  
  .filter-bar input, .filter-bar select {
    padding: 8px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .filter-bar button {
    padding: 8px 16px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .filter-bar button:hover {
    background-color: #0056b3;
  }
  
  .reports-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .reports-table th, .reports-table td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  .reports-table th {
    background-color: #f4f4f4;
  }

  .selected-dept {
    font-size: 18px;
    color: #444;
    margin: 10px 0 20px;
    text-align: center;
    font-weight: 600;
  }
  
  
      `}</style>
    </div>
  );
}

export default ViewReports;
