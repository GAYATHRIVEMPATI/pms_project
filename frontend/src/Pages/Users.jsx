import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/users/all")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
      });
  }, []);

  const filteredUsers = users.filter((user) => {
    const userId = user.user_id ? user.user_id.toString().toLowerCase() : "";
    const username = user.username && typeof user.username === 'string' ? user.username.toLowerCase() : "";
    const email = user.email && typeof user.email === 'string' ? user.email.toLowerCase() : "";
    const role = user.role && typeof user.role === 'string' ? user.role.toLowerCase() : "";

    return (
      userId.includes(searchQuery.toLowerCase()) ||
      username.includes(searchQuery.toLowerCase()) ||
      email.includes(searchQuery.toLowerCase()) ||
      role.includes(searchQuery.toLowerCase())
    );
  });

  const navigate = useNavigate();

  const handleAddUser = () => {
    navigate("/add-user");
  };

  return (
    <div className="users-page">
      <h2>Manage Users</h2>

      <div className="search-add-container">
        <input
          type="text"
          placeholder="Search users..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="add-user-btn" onClick={handleAddUser}>
          Add User
        </button>
      </div>

      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.user_id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Link to={`/user-details/${user.user_id}`}>
                      <button className="view-details-btn">View Details</button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .users-page {
          padding: 10px;
          margin-top: 0px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          width: 90%;
        }

        h2 {
          font-size: 32px;
          font-weight: bold;
          color: #333;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-bottom: 2px solid #4CAF50;
          display: inline-block;
          padding-bottom: 10px;
          text-align: center;
        }

        .search-add-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-top: 10px;
          margin-bottom: 20px;
        }

        .search-input {
          padding: 12px 20px;
          font-size: 16px;
          border-radius: 25px;
          border: 1px solid #ccc;
          width: 400px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: border 0.3s, box-shadow 0.3s;
        }

        .search-input:focus {
          outline: none;
          border-color: #4CAF50;
          box-shadow: 0 4px 10px rgba(76, 175, 80, 0.2);
        }

        .search-input::placeholder {
          color: #aaa;
          font-style: italic;
        }

        .add-user-btn {
          background-color: #2196F3;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 25px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .add-user-btn:hover {
          background-color: #1976D2;
        }

        .table-container {
          width: 100%;
          overflow-x: auto;
          margin-top: 20px;
        }

        .users-table {
          width: 100%;
          border-collapse: collapse;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          background-color: #fff;
          table-layout: fixed;
        }

        .users-table th, .users-table td {
          padding: 12px;
          text-align: left;
          border: 1px solid #ddd;
        }

        .users-table th {
          background-color: #f4f4f4;
          color: #333;
        }

        .users-table tr:hover {
          background-color: #f9f9f9;
        }

        .view-details-btn {
          background-color: #4CAF50;
          color: white;
          padding: 8px 12px;
          border: none;
          cursor: pointer;
          border-radius: 4px;
          transition: background-color 0.3s;
        }

        .view-details-btn:hover {
          background-color: #45a049;
        }

        @media (max-width: 768px) {
          .search-add-container {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .search-input {
            width: 100%;
          }

          .add-user-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Users;
