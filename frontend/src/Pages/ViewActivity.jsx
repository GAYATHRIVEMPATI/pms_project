import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewActivity = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("user_id"); // Get user ID from local storage

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/activity/${userId}`);
        setSessions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching activity:", error);
        setLoading(false);
      }
    };

    if (userId) {
      fetchSessions();
    }
  }, [userId]);

  return (
    <div className="view-activity-containers1">
      <h1 className="view-activity-headings1">Login Activity</h1>

      {loading ? (
        <p>Loading...</p>
      ) : sessions.length === 0 ? (
        <p className="empty-state">No activity found for this user.</p>
      ) : (
        <table className="activity-tables1">
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Session ID</th>
              <th>Login Time</th>
              <th>Logout Time</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session, index) => (
              <tr key={session.session_id}>
                <td>{index + 1}</td>
                <td>{session.session_id}</td>
                <td>{new Date(session.login_time).toLocaleString()}</td>
                <td>{session.logout_time ? new Date(session.logout_time).toLocaleString() : "Still logged in"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <style>{`
      /* General Page Layout */
      .view-activity-containers1 {
          /* Remove max-width, padding, background, and box-shadow */
          background-color: transparent; /* No background color */
          padding: 10; /* Remove padding */
          margin-left: 20px;
          width: calc(100% - 220px);
          font-family: 'Arial', sans-serif;
      }

      /* Heading Style */
      .view-activity-headings1 {
          text-align: center;
          font-size: 2.2rem;
          font-weight: 700;
          color: #333;
          margin-bottom: 20px; /* Reduce bottom margin */
          letter-spacing: 0.5px;
          text-transform: uppercase;
          /* Remove the border-bottom */
      }

      /* Table Styles */
      .activity-tables1 {
          width: 100%; /* Make the table take the full width */
          border-collapse: collapse;
          margin-top: 20px;
          border-radius: 0; /* Remove rounded corners */
          background-color: #fff;
      }

      /* Table Cell Styles */
      .activity-tables1 th,
      .activity-tables1 td {
          padding: 15px;
          text-align: center;
          border-bottom: 1px solid #e0e0e0;
          font-size: 1rem;
      }

      /* Table Header Style */
      .activity-tables1 th {
          background-color: #007bff;
          color: #fff;
          font-weight: 600;
          text-transform: uppercase;
      }

      /* Table Data Cell Style */
      .activity-tables1 td {
          color: #555;
      }

      /* Hover and Active States for Rows */
      .activity-tables1 tr:hover {
          background-color: #f5f5f5;
          cursor: pointer;
      }

      .activity-tables1 tr:nth-child(odd) {
          background-color: #f9f9f9;
      }

      .activity-tables1 td:last-child {
          color: #777;
      }

      /* Styling for Empty State */
      .empty-state {
          text-align: center;
          font-size: 1.3rem;
          color: #888;
          padding: 20px;
          font-style: italic;
          border-top: 1px solid #e0e0e0;
          margin-top: 20px;
      }

      /* Media Queries for Responsiveness */
      @media (max-width: 768px) {
          .activity-tables1 th,
          .activity-tables1 td {
              font-size: 0.9rem;
              padding: 10px;
          }

          .view-activity-headings1 {
              font-size: 1.8rem;
          }
      }

      `}</style>
    </div>
  );
};

export default ViewActivity;
