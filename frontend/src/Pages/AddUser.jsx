import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_id: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    department: "",
    newDepartment: "",
    designation: "",
    role_id: "",
  });

  const [departments, setDepartments] = useState([
    "Information Technology",
    "Computer Science",
    "Electronics and Communication",
    "Mechanical Engineering",
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/departments")
      .then((res) => {
        setDepartments(res.data);
      })
      .catch((err) => {
        console.error("Error fetching departments:", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const finalDepartment = formData.newDepartment || formData.department;

    const newUser = {
      user_id: formData.user_id,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      department: finalDepartment,
      designation: formData.designation,
      role_id: formData.role_id,
      created_at: new Date().toISOString(),
    };

    try {
      await axios.post("http://localhost:5000/api/users/add", newUser);

      if (formData.newDepartment && !departments.includes(formData.newDepartment)) {
        setDepartments((prevDepartments) => [...prevDepartments, formData.newDepartment]);
      }

      alert("User added successfully!");
      navigate("/admin/users");
    } catch (error) {
      alert("Error adding user!");
      console.error("Add user error:", error);
    }
  };

  return (
    <div className="add-user-container">
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit} className="add-user-form">
        <div className="form-group">
          <label>User ID:</label>
          <input
            type="number"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Department:</label>
          <select name="department" value={formData.department} onChange={handleChange}>
            <option value="">Select Department</option>
            {departments.map((dept, index) => (
              <option key={dept._id || index} value={dept.name || dept}>
                {dept.name || dept}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Or Add New Department:</label>
          <input
            type="text"
            name="newDepartment"
            value={formData.newDepartment}
            onChange={handleChange}
            placeholder="Enter new department name"
          />
        </div>

        <div className="form-group">
          <label>Designation:</label>
          <select
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
          >
            <option value="">Select Designation</option>
            <option value="Professor">Professor</option>
            <option value="Assistant Professor">Assistant Professor</option>
            <option value="Associate Professor">Associate Professor</option>
            <option value="HOD">HOD</option>
            <option value="Deputy HOD">Deputy HOD</option>
            <option value="DEO">DEO</option>
            <option value="Dean">Dean</option>
          </select>
        </div>

        <div className="form-group">
          <label>Role:</label>
          <select name="role_id" value={formData.role_id} onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="1">Admin</option>
            <option value="2">User</option>
            <option value="3">Vendor</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">
          Add User
        </button>
      </form>

      <style>{`
  .add-user-container {
    max-width: 600px;
    width: 100%;
    margin: 50px auto;
    padding: 20px;
    background: linear-gradient(to bottom, #f4f4f9, #ffffff);
    border-radius: 15px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    font-family: 'Helvetica', sans-serif;
    box-sizing: border-box; /* Ensure padding doesn't cause overflow */
  }

  h2 {
    text-align: center;
    color: #333;
    font-size: 26px;
    font-weight: 600;
    margin-bottom: 25px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .add-user-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-group {
    font-size: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px; /* Add gap between label and input */
  }

  label {
    font-weight: 500;
    color: #555;
    margin-bottom: 5px;
    font-size: 14px;
  }

  input,
  select {
    width: 100%;
    padding: 12px;
    border-radius: 10px;
    border: 1px solid #ddd;
    background: #ffffff;
    font-size: 14px;
    color: #444;
    transition: all 0.3s ease-in-out;
    box-sizing: border-box; /* Prevent overflow */
  }

  input:focus,
  select:focus {
    border-color: #6c63ff;
    box-shadow: 0 0 8px rgba(108, 99, 255, 0.3);
    outline: none;
  }

  input::placeholder {
    color: #bbb;
  }

  .submit-btn {
    background-color: #6c63ff;
    color: white;
    padding: 12px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    border-radius: 10px;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  .submit-btn:hover {
    background-color: #5a52e0;
    transform: translateY(-2px);
  }

  .submit-btn:active {
    background-color: #4e47d6;
    transform: translateY(0);
  }

  .form-group select {
    background-color: #ffffff;
    color: #555;
  }

  .form-group input,
  .form-group select {
    border: 1px solid #ddd;
  }

  .form-group input:focus,
  .form-group select:focus {
    border-color: #6c63ff;
    box-shadow: 0 0 8px rgba(108, 99, 255, 0.3);
  }

  @media (max-width: 768px) {
    .add-user-container {
      width: 90%;
      padding: 15px;
    }

    h2 {
      font-size: 22px;
      margin-bottom: 20px;
    }

    .submit-btn {
      font-size: 14px;
      padding: 10px;
    }
  }
`}</style>



    </div>
  );
};

export default AddUser;
