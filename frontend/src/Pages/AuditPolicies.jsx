import React, { useState } from "react";

const AuditPolicies = () => {
  // Sample Policy Rules
  const policyRules = {
    financialLimit: 10000, // Example: Max amount per request
    approvedVendors: ["Vendor A", "Vendor B", "Vendor C", "Vendor D", "Vendor E"],
    allowedCategories: ["IT Equipment", "Stationery", "Furniture", "Electronics", "Software", "Laboratory Equipment"],
    allowedUserRoles: ["Admin", "Faculty", "Staff", "Student Representative", "Finance Department"],
    sustainabilityRequirement: true,
  };

  // State for procurement request
  const [request, setRequest] = useState({
    department: "",
    userRole: "",
    amount: "",
    vendor: "",
    category: "",
    quantity: "",
    availability: "",
    rating: "",
    sustainabilityCompliant: false,
  });

  // State for validation messages
  const [validationMessage, setValidationMessage] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRequest({
      ...request,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Function to Validate Procurement Request
  const validateRequest = () => {
    let errors = [];
  
    if (parseFloat(request.amount) > policyRules.financialLimit) {
      errors.push(`Amount exceeds financial limit of $${policyRules.financialLimit}.`);
    }
    if (!policyRules.approvedVendors.includes(request.vendor)) {
      errors.push("Vendor is not approved.");
    }
    if (!policyRules.allowedCategories.includes(request.category)) {
      errors.push("Item category is not allowed.");
    }
    if (policyRules.sustainabilityRequirement && !request.sustainabilityCompliant) {
      errors.push("Request does not meet sustainability guidelines.");
    }
    if (!request.quantity || request.quantity <= 0) {
      errors.push("Invalid quantity.");
    }
    if (!request.availability) {
      errors.push("Availability selection required.");
    }
    if (!request.rating || request.rating < 1 || request.rating > 5) {
      errors.push("Rating must be between 1 and 5.");
    }
  
    if (errors.length > 0) {
      setValidationMessage(errors.join(" "));
    } else {
      setValidationMessage("Request is valid and compliant with policies.");
    }
  };
  

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Policy Enforcement</h1>

      

      <h3 style={styles.subTitle}>Procurement Validation Form</h3>
      <div style={styles.form}>
        {/* Department Dropdown */}
        <label>Department:</label>
        <select name="department" value={request.department} onChange={handleChange} style={styles.input}>
          <option value="">Select Department</option>
          <option value="IT">IT</option>
          <option value="ECE">ECE</option>
          <option value="CSE">CSE</option>
          <option value="EEE">EEE</option>
          <option value="FT">FT</option>
          <option value="Civil">Civil</option>
          <option value="Mechanical">Mechanical</option>
        </select>

        {/* User Role Dropdown */}
        <label>User Role:</label>
        <select name="userRole" value={request.userRole} onChange={handleChange} style={styles.input}>
          <option value="">Select User Role</option>
          {policyRules.allowedUserRoles.map((role, index) => (
            <option key={index} value={role}>
              {role}
            </option>
          ))}
        </select>

        <label>Amount:</label>
        <input type="number" name="amount" value={request.amount} onChange={handleChange} style={styles.input} />

        {/* Vendor Dropdown */}
        <label>Vendor:</label>
        <select name="vendor" value={request.vendor} onChange={handleChange} style={styles.input}>
          <option value="">Select Vendor</option>
          {policyRules.approvedVendors.map((vendor, index) => (
            <option key={index} value={vendor}>
              {vendor}
            </option>
          ))}
        </select>

        {/* Category Dropdown */}
        <label>Category:</label>
        <select name="category" value={request.category} onChange={handleChange} style={styles.input}>
          <option value="">Select Category</option>
          {policyRules.allowedCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label>Quantity:</label>
        <input type="number" name="quantity" value={request.quantity} onChange={handleChange} style={styles.input} />

        {/* Availability Dropdown */}
        <label>Is this item available?</label>
        <select name="availability" value={request.availability} onChange={handleChange} style={styles.input}>
          <option value="">Select Availability</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <label>Rating (1-5):</label>
        <input type="number" name="rating" min="1" max="5" value={request.rating} onChange={handleChange} style={styles.input} />

        <label>
          <input type="checkbox" name="sustainabilityCompliant" checked={request.sustainabilityCompliant} onChange={handleChange} />
          Meets Sustainability Guidelines
        </label>

        <button onClick={validateRequest} style={styles.button}>Validate Request</button>

        {validationMessage && (
          <div style={validationMessage.includes("valid") ? styles.successMessage : styles.errorMessage}>
            {validationMessage}
          </div>
        )}
      </div>

      <h3 style={styles.subTitle}>Audit & Policy Violations</h3>
      <p>Maintain a record of policy violations for audit purposes.</p>
    </div>
  );
};



// 🎨 Stylish UI
const styles = {
  container: {
    maxWidth: "1000px",
    margin: "auto",
    padding: "30px",
    backgroundColor: "#fffbe6",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    color: "#8B4513",
  },
  subTitle: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#5b5a4f",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  input: {
    padding: "10px",
    fontSize: "12px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "5px",
  },
  button: {
    padding: "12px",
    backgroundColor: "#8B4513",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "18px",
  },
  successMessage: {
    color: "green",
    fontWeight: "bold",
  },
  errorMessage: {
    color: "red",
    fontWeight: "bold",
  }
};

export default AuditPolicies;
