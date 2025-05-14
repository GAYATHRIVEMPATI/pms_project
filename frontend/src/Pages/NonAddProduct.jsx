import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../Context/AppContext";

function NONAddProduct() {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [allocatedBudget, setAllocatedBudget] = useState("");
  const { selectedDepartment } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      productId,
      productName,
      allocatedAmount: Number(allocatedBudget),
      department: selectedDepartment,
      category: "Non Recurring" // or "Non-Recurring" — depending on current page context
    };

    await axios.post("http://localhost:5000/api/products", newProduct);
    alert("Product added!");
    navigate("/admin/budget/non-recurring");
  };

  const handleCancel = () => {
    navigate("/admin/budget/non-recurring");
  };

  return (
    <div className="add-product-wrapper">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Product ID:</label>
          <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} required />
        </div>
        <div className="form-row">
          <label>Product Name:</label>
          <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />
        </div>
        <div className="form-row">
          <label>Allocated Budget:</label>
          <input type="number" value={allocatedBudget} onChange={(e) => setAllocatedBudget(e.target.value)} required />
        </div>
        <div className="button-group">
          <button type="submit">Add Product</button>
          <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
        </div>
      </form>
      <style>{`
      .add-product-wrapper {
  max-width: 500px;
  margin: 50px auto;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
}

.add-product-wrapper h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.form-row label {
  flex: 1;
  font-weight: 600;
  margin-right: 15px;
  color: #333;
}

.form-row input {
  flex: 2;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  outline: none;
  transition: 0.2s;
}

.form-row input:focus {
  border-color: #4caf50;
  box-shadow: 0 0 3px rgba(76, 175, 80, 0.5);
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.button-group button {
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 15px;
  transition: 0.3s;
}

.button-group button[type="submit"] {
  background-color: #4caf50;
  color: white;
}

.button-group button[type="submit"]:hover {
  background-color: #45a049;
}

.cancel-button {
  background-color: #f44336;
  color: white;
}

.cancel-button:hover {
  background-color: #e53935;
}

      `}</style>
    </div>
  );
}

export default NONAddProduct;

