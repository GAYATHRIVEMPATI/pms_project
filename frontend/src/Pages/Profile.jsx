import React from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Import an icon for profile

const Profile = () => {
  const navigate = useNavigate();

  // Sample user data (to be replaced with actual fetched data)
  const user = {
    user_id: "U12345",
    username: "John Doe",
    email: "johndoe@example.com",
    phone: "9876543210",
    department: "IT",
    role: "Admin",
    created_at: "2024-01-10",
  };

  return (
    <div className="profile-container">
      {/* Profile Card */}
      <div className="profile-card">
        <FaUserCircle className="profile-icon" />
        <h2>{user.username}</h2>
        <p className="role">{user.role}</p>
        <div className="profile-details">
          <p><strong>User ID:</strong> {user.user_id}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Department:</strong> {user.department}</p>
          <p><strong>Created At:</strong> {user.created_at}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="profile-actions">
        <button onClick={() => navigate("/edit-profile")} className="edit-btn">
          Edit Profile
        </button>
        <button onClick={() => navigate("/activity")} className="activity-btn">
          View Activity
        </button>
      </div>
    </div>
  );
};

export default Profile;
