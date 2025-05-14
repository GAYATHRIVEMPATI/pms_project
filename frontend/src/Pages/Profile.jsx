import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/users/profile/${userId}`);
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  if (!user) return <div>Loading profile...</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <FaUserCircle className="profile-icon" />
        <h2>{user.username}</h2>
        <p className="role">{user.role}</p>
        <div className="profile-details">
          <p><strong>User ID:</strong> {user.user_id}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Department:</strong> {user.department}</p>
          <p><strong>Created At:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="profile-actions">
        <button onClick={() => navigate("/edit-profile")} className="edit-btn">
          Edit Profile
        </button>
        <button onClick={() => navigate("/view-activity")} className="activity-btn">
          View Activity
        </button>
      </div>
      <style>{`
      /* Profile Page Container */
      .profile-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 90vh;
          width: 90%;
          background-color: #f4f7fc;
          padding: 20px;
      }

      /* Profile Card - Now takes up more space */
      .profile-card {
          background: white;
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          text-align: center;
          width: 80%;  /* Increased width */
          max-width: 800px;  /* Limits the card width */
          display: flex;
          flex-direction: column;
          align-items: center;
      }

      /* Profile Icon */
      .profile-icon {
          font-size: 100px;
          color: #007bff;
          margin-bottom: 10px;
      }

      /* User Role */
      .role {
          color: #666;
          font-size: 20px;
          margin-bottom: 20px;
      }

      /* Profile Details */
      .profile-details {
          text-align: left;
          font-size: 18px;
          width: 100%; 
          max-width: 600px; /* Makes sure text stays aligned */
      }

      /* Add spacing between details */
      .profile-details p {
          margin: 10px 0;
      }

      /* Buttons */
      .profile-actions {
          margin-top: 20px;
          display: flex;
          gap: 20px;
          justify-content: center;
      }

      .profile-actions button {
          border: none;
          padding: 12px 24px;
          font-size: 18px;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s;
          width: 180px;
      }

      .edit-btn {
          background-color: #007bff;
          color: white;
      }

      .activity-btn {
          background-color: #28a745;
          color: white;
      }

      .profile-actions button:hover {
          opacity: 0.8;
      }

      `}</style>
    </div>
  );
};

export default Profile;
