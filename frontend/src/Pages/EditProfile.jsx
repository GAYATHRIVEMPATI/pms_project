// Pages/EditProfile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    department: ""
  });

  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/users/profile/${userId}`);
        const data = await res.json();
        setUser(data);
        setFormData({
          username: data.username,
          email: data.email,
          phone: data.phone,
          department: data.department,
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/users/edit/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert("Profile updated successfully");
        navigate("/profile");
      } else {
        const data = await res.json();
        alert(data.message || "Update failed");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong.");
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} className="edit-profile-form">

        <div className="form-row">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="save-btn">Save</button>
      </form>
      <style>{`
      /* EditProfile.css */

      .edit-profile-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 90vh;
          width: 100%;
          background-color: #f4f7fc;
          padding: 20px;
      }

      .edit-profile-form {
          background: white;
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          text-align: center;
          width: 80%;
          max-width: 800px;
          display: flex;
          flex-direction: column;
          align-items: center;
      }

      /* Form Row: label + input side by side */
      .form-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin-bottom: 20px;
          max-width: 600px;
      }

      /* Labels */
      .form-row label {
          flex: 1;
          text-align: left;
          font-weight: 500;
          margin-right: 20px;
          font-size: 16px;
          color: #333;
      }

      /* Input fields */
      .form-row input {
          flex: 2;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 16px;
      }

      /* Submit Button */
      .save-btn {
          padding: 12px 30px;
          background-color: #4CAF50;
          border: none;
          color: white;
          font-size: 18px;
          font-weight: bold;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s;
          margin-top: 20px;
      }

      .save-btn:hover {
          background-color: #45a049;
      }

      `}</style>
    </div>
  );
};

export default EditProfile;
