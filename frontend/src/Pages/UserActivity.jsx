import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserActivity = () => {
  const { userId } = useParams();
  const [activity, setActivity] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/activity/${userId}`)
      .then((res) => {
        setActivity(res.data);
      })
      .catch(() => {
        setError("Error fetching user activity");
      });
  }, [userId]);

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="user-activity-container">
      <h2>User Activity</h2>
      <div className="table-container">
        <table className="user-activity-table">
          <thead>
            <tr>
              <th>Session ID</th>
              <th>Login Time</th>
              <th>Logout Time</th>
            </tr>
          </thead>
          <tbody>
            {activity.length > 0 ? (
              activity.map((session) => (
                <tr key={session.session_id}>
                  <td>{session.session_id}</td>
                  <td>{new Date(session.login_time).toLocaleString()}</td>
                  <td>
                    {session.logout_time
                      ? new Date(session.logout_time).toLocaleString()
                      : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No activity found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <style>{`
      .user-activity-container {
        padding: 10px 10px;
        margin-left: 20px; /* Adjust this to match your sidebar width */
        margin-top: 0px;    /* Adjust based on your top navbar height */
        box-sizing: border-box;
        width: calc(100% - 220px); /* Full width minus sidebar */
      }
      
      .user-activity-container h2 {
        font-size: 26px;
        font-weight: 600;
        color: #2c3e50;
        margin-bottom: 0px;
        padding-bottom: 10px;
        border-bottom: 2px solid #4CAF50;
        text-align: left;
      }
      
      .table-container {
        width: 100%;
        overflow-x: auto;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 0 12px rgba(0, 0, 0, 0.08);
      }
      
      .user-activity-table {
        width: 100%;
        border-collapse: collapse;
        font-family: "Segoe UI", sans-serif;
        font-size: 14px;
        color: #333;
      }
      
      .user-activity-table th {
        background-color: rgb(240, 238, 236); /* same green as Users.jsx */
        color: rgb(22, 21, 21);
        padding: 14px 18px;
        text-align: left;
        border: 1px solid #ddd;
      }
      .user-activity-table td {
        padding: 14px 18px;
        border: 1px solid #e0e0e0;
        text-align: left;
        white-space: nowrap;
      }
      

      
      .user-activity-table tr:nth-child(even) {
        background-color: #f7f7f7;
      }
      
      .user-activity-table tr:hover {
        background-color: #e8f5e9;
        cursor: pointer;
        transition: 0.2s ease-in-out;
      }
      
      .error-message {
        color: red;
        font-weight: bold;
        margin-top: 20px;
      }
  
      `}</style>
    </div>
  );
};

export default UserActivity;
