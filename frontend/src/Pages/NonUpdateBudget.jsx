/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";

// Dummy product data for testing
const dummyProducts = [
  { id: "101", name: "Printer", allocatedBudget: 5000 },
  { id: "102", name: "Monitor", allocatedBudget: 8000 },
  { id: "103", name: "Keyboard", allocatedBudget: 2000 }
];

function UpdateProduct() {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [allocatedBudget, setAllocatedBudget] = useState(0);
  const [expenditureBudget, setExpenditureBudget] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleProductSearch = (id) => {
    const product = dummyProducts.find((p) => p.id === id);
    if (product) {
      setProductName(product.name);
      setAllocatedBudget(product.allocatedBudget);
    } else {
      setProductName("");
      setAllocatedBudget(0);
    }
  };

  const handleProductIdChange = (e) => {
    const id = e.target.value;
    setProductId(id);
    handleProductSearch(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName) {
      alert("Product ID not found!");
      return;
    }
    alert("Product Updated Successfully!");
    navigate("/Recurring");
  };

  const handleCancel = () => {
    navigate("/Recurring");
  };

  return (
    <div className="add-product-wrapper">
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Product ID:</label>
          <input
            type="text"
            value={productId}
            onChange={handleProductIdChange}
            required
          />
        </div>

        <div className="form-row">
          <label>Product Name:</label>
          <input type="text" value={productName} readOnly />
        </div>

        <div className="form-row">
          <label>Expenditure Budget:</label>
          <input
            type="number"
            value={expenditureBudget}
            onChange={(e) => setExpenditureBudget(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <label>Remaining Budget:</label>
          <input
            type="number"
            value={
              expenditureBudget !== ""
                ? allocatedBudget - expenditureBudget
                : allocatedBudget
            }
            readOnly
          />
        </div>

        <div className="form-row">
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="button-group">
          <button type="submit">Update Product</button>
          <button
            type="button"
            onClick={handleCancel}
            className="cancel-button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProduct;*/

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UpdateBudget.css";

function NONUpdateProduct() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [allocatedBudget, setAllocatedBudget] = useState(0);
  const [expenditureBudget, setExpenditureBudget] = useState("");
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [date, setDate] = useState("");
  const [productNotFound, setProductNotFound] = useState(false);
  const navigate = useNavigate();

  // Fetch products on mount
  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleProductIdChange = (e) => {
    const id = e.target.value;
    setProductId(id);

    const product = products.find((p) => p.productId === id);
    if (product) {
      setProductName(product.productName);
      setAllocatedBudget(product.allocatedAmount);
      setProductNotFound(false);
    } else {
      setProductName("");
      setAllocatedBudget(0);
      setProductNotFound(id !== "");
    }
  };

  useEffect(() => {
    if (expenditureBudget !== "" && allocatedBudget !== 0) {
      setRemainingBudget(allocatedBudget - expenditureBudget);
    } else {
      setRemainingBudget(allocatedBudget);
    }
  }, [expenditureBudget, allocatedBudget]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = products.find((p) => p.productId === productId);
    if (!product) {
      alert("Product ID not found!");
      return;
    }

    await axios.post("http://localhost:5000/api/reports", {
      productId,
      productName,
      department: product.department,
      category: product.category,
      expenditureAmount: Number(expenditureBudget),
      remainingAmount: Number(remainingBudget),
      date
    });

    alert("Product budget updated successfully!");

    // Instantly navigate back to Recurring page after alert
    navigate("/admin/budget/non-recurring");
  };

  const handleCancel = () => {
    navigate("/admin/budget/non-recurring");
  };

  return (
    <div className="add-product-wrapper">
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Product ID:</label>
          <input
            type="text"
            value={productId}
            onChange={handleProductIdChange}
            required
          />
          {productNotFound && (
            <p style={{ color: "red", marginTop: "5px" }}>Product not available</p>
          )}
        </div>

        <div className="form-row">
          <label>Product Name:</label>
          <input type="text" value={productName} readOnly />
        </div>

        <div className="form-row">
          <label>Expenditure Budget:</label>
          <input
            type="number"
            value={expenditureBudget}
            onChange={(e) => setExpenditureBudget(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <label>Remaining Budget:</label>
          <input type="number" value={remainingBudget} readOnly />
        </div>

        <div className="form-row">
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="button-group">
          <button type="submit">Update Product</button>
          <button type="button" onClick={handleCancel} className="cancel-button">
            Cancel
          </button>
        </div>
      </form>
      <style>{``}</style>
    </div>
  );
}

export default NONUpdateProduct;
