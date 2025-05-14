import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { userId } = useParams(); // Get userId from the URL params
  const navigate = useNavigate(); // For navigating after actions

  useEffect(() => {
    // Fetch user details by user_id
    axios
      .get(`http://localhost:5000/api/users/profile/${userId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        setError("Error fetching user details");
      });
  }, [userId]);

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;
  
    try {
      await axios.delete(`http://localhost:5000/api/users/delete/${userId}`);
      alert("User deleted successfully.");
      navigate("/admin/users");
    } catch (err) {
      alert("Error deleting user");
    }
  };
  

  const handleViewActivity = () => {
    // Navigate to the user's activity page (UserActivity.jsx)
    navigate(`/user-activity/${userId}`);
  };

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="user-details-container">
      {user ? (
        <div className="user-details-card">
          <h2>User Details</h2>
          <p><strong>User ID:</strong> {user.user_id}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Department:</strong> {user.department}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Created At:</strong> {new Date(user.created_at).toLocaleString()}</p>

          {/* Buttons */}
          <div className="user-details-buttons">
            <button className="delete-button" onClick={handleDelete}>
              Delete User
            </button>
            <button className="view-activity-button" onClick={handleViewActivity}>
              View Activity
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <style>{`
      /* UserDetails.css */

      /* Main container for centering the content */
      .user-details-container {
          display: flex;
          justify-content: center;  /* Center horizontally */
          align-items: center;      /* Center vertically */
          min-height: 100vh;        /* Take full viewport height */
          background-color: #f4f7fc;
          marginTop: 10px;
          padding: 20px;
          width: 90%;
        }
        
        /* Card styling */
        .user-details-card {
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 700px; /* Set a maximum width for the card */
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        
        /* Paragraph text inside the card */
        .user-details-card p {
          font-size: 16px;
          margin: 10px 0;
          line-height: 1.6;
          text-align: left; /* Align text to left */
          width: 100%;
        }
        
        strong {
          color: #555;
        }
        
        /* Button container for proper spacing */
        .user-details-buttons {
          display: flex;
          justify-content: center; /* Center buttons horizontally */
          gap: 20px; /* Space between buttons */
          width: 100%;
          margin-top: 20px;
        }
        
        /* Button styling */
        button {
          padding: 10px 15px;
          border: none;
          font-size: 16px;
          cursor: pointer;
          border-radius: 5px;
          transition: background-color 0.3s ease;
          width: 160px; /* Set width for consistency */
        }
        
        .delete-button {
          background-color: #ff4c4c;
          color: #fff;
        }
        
        .delete-button:hover {
          background-color: #e33f3f;
        }
        
        .view-activity-button {
          background-color: #4c8bf5;
          color: #fff;
        }
        
        .view-activity-button:hover {
          background-color: #3578d4;
        }
        
        /* Error message style */
        .error-message {
          color: red;
          text-align: center;
          font-size: 18px;
        }
  
      `}</style>
    </div>
  );
};

export default UserDetails;
