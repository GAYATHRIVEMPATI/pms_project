/*import React from "react";
import { useAppContext } from "../Context/AppContext"; // Import context
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import "./Recurring.css";

function Recurring() {
  const { products, selectedDepartment } = useAppContext();  // Get products and department from context
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="recurring-wrapper">
  <h2 className="page-title">Non Recurring Products</h2>

  <div className="selected-dept">
    {selectedDepartment ? `${selectedDepartment}` : "No department selected"}
  </div>

  


      <table className="product-table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Allocated Budget</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.allocatedBudget}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No products available.</td>
            </tr>
          )}
        </tbody>
      </table>

      
      <div className="action-buttons">
        <button
          className="add-btn"
          onClick={() => navigate("/add-product")}
        >
          + Add Product
        </button>
        <button
          className="update-btn"
          onClick={() => navigate("/update-budget")}
        >
          ✏️ Update Budget
        </button>
      </div>
    </div>
  );
}

export default Recurring;*/


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../Context/AppContext";

function NonRecurring() {
  const [products, setProducts] = useState([]);
  const { selectedDepartment } = useAppContext();
  const navigate = useNavigate();

  // Fetch products from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => {
        // Filter products by department and category Non-Recurring
        const nonRecurringProducts = res.data.filter(
          (p) => p.department === selectedDepartment && p.category === "Non Recurring"
        );
        setProducts(nonRecurringProducts);
      })
      .catch(err => console.error(err));
  }, [selectedDepartment]);

  return (
    <div className="recurring-wrapper">
      <h2 className="page-title">Non Recurring Products</h2>
      <h3 className="selected-dept">Selected Department: {selectedDepartment}</h3>

      <table className="product-table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Allocated Budget</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id}>
                <td>{product.productId}</td>
                <td>{product.productName}</td>
                <td>{product.allocatedAmount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No products available.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="action-buttons">
        <button className="add-btn" onClick={() => navigate("/admin/budget/non-add-product")}>+ Add Product</button>
        <button className="update-btn" onClick={() => navigate("/admin/budget/non-update-budget")}>✏️ Update Budget</button>
      </div>
      <style>{`
      .recurring-wrapper {
    padding: 30px;
    max-width: 1000px;
    margin: 0 auto;
  }
  
  .dept-label {
    font-size: 20px;
    margin: 20px 0 30px;
    color: #333;
  }
  
  .product-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 30px;
    margin-bottom: 30px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  .product-table th,
  .product-table td {
    border: 1px solid #ddd;
    padding: 12px 18px;
    text-align: left;
  }
  
  .product-table th {
    background-color: #f5f5f5;
    font-weight: 600;
  }
  
  .product-table tbody tr:hover {
    background-color: #fafafa;
  }
  
  .action-buttons {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }
  
  .add-btn,
  .update-btn {
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    color: white;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.2s ease;
  }
  
  .add-btn {
    background-color: #4caf50;
  }
  
  .add-btn:hover {
    background-color: #43a047;
  }
  
  .update-btn {
    background-color: #2196f3;
  }
  
  .update-btn:hover {
    background-color: #1976d2;
  }
  
      `}</style>
    </div>
  );
}

export default NonRecurring;

