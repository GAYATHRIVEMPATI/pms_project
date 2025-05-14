import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Report.css"

function Report() {
  const [allReports, setAllReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);

  const [productId, setProductId] = useState("");
  const [category, setCategory] = useState("");
  const [department, setDepartment] = useState("");

  const departments = ["IT", "CSE", "ECE", "EEE"];

  // Fetch reports from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/reports")
      .then(res => {
        setAllReports(res.data);
      })
      .catch(err => console.error("Error fetching reports:", err));
  }, []);

  // Apply filters whenever inputs change
  useEffect(() => {
    let filtered = allReports;

    // Filter by Product ID
    if (productId) {
      filtered = filtered.filter((report) =>
        report.productId.toLowerCase().includes(productId.toLowerCase())
      );
    }

    // Filter by Category
    if (category) {
      filtered = filtered.filter((report) => report.category === category);
    }

    // Filter by Department
    if (department) {
      filtered = filtered.filter((report) => report.department === department);
    }

    setFilteredReports(filtered);
  }, [productId, category, department, allReports]);

  const resetFilters = () => {
    setProductId("");
    setCategory("");
    setDepartment("");
  };

  return (
    <div className="recurring-wrapper">
      <h2 className="page-title">Procurement Budget Reports</h2>

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

        <select value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option value="">Select Department</option>
          {departments.map((dept, index) => (
            <option key={index} value={dept}>{dept}</option>
          ))}
        </select>

        <button onClick={resetFilters}>Reset Filters</button>
      </div>

      {/* Reports Table */}
      <table className="product-table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Department</th>
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
                <td>{report.department}</td>
                <td>{report.category}</td>
                <td>{report.expenditureAmount}</td>
                <td>{report.remainingAmount}</td>
                <td>{report.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No reports found.</td>
            </tr>
          )}
        </tbody>
      </table>
      

    </div>
  );
}

export default Report;