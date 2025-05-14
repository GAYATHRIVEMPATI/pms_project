import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RefreshCw, Star, FileText } from "lucide-react";
import axios from "axios";
import { useAppContext } from "../Context/AppContext";

function Dashboard() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const { setSelectedDepartment } = useAppContext();

  // Fetch departments from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/departments")
      .then(res => setDepartments(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleNavigate = (path) => {
    if (!selectedDept) {
      alert("Please select a department first!");
      return;
    }
    setSelectedDepartment(selectedDept);
    navigate(path);
  };

  return (
    <div style={{ padding: '30px', textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '32px', color: '#333', marginBottom: '30px' }}>Procurement Budget</h1>

      {/* Department Dropdown */}
      <div style={{ marginBottom: '30px' }}>
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          style={{
            padding: '12px 20px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '6px',
            outline: 'none',
            width: '260px'
          }}
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept._id} value={dept.name}>
              {dept.name}
            </option>
          ))}
        </select>
      </div>

      {/* Category Cards */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
        gap: '25px',
        maxWidth: '100%'
      }}>
        <div
          style={{
            width: '200px',
            height: '160px',
            backgroundColor: '#f4f4f4',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            padding: '25px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onClick={() => handleNavigate("/admin/budget/recurring")}
        >
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px',
            backgroundColor: '#42a5f5'
          }}>
            <RefreshCw size={32} color="#fff" />
          </div>
          <p style={{ margin: '0', fontSize: '18px', fontWeight: '500', color: '#333' }}>Recurring</p>
        </div>

        <div
          style={{
            width: '200px',
            height: '160px',
            backgroundColor: '#f4f4f4',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            padding: '25px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onClick={() => handleNavigate("/admin/budget/non-recurring")}
        >
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px',
            backgroundColor: '#ab47bc'
          }}>
            <Star size={32} color="#fff" />
          </div>
          <p style={{ margin: '0', fontSize: '18px', fontWeight: '500', color: '#333' }}>Non-Recurring</p>
        </div>

        <div
          style={{
            width: '200px',
            height: '160px',
            backgroundColor: '#f4f4f4',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            padding: '25px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onClick={() => navigate("/admin/budget/view-reports")}
        >
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px',
            backgroundColor: '#66bb6a'
          }}>
            <FileText size={32} color="#fff" />
          </div>
          <p style={{ margin: '0', fontSize: '18px', fontWeight: '500', color: '#333' }}>View Reports</p>
        </div>

        <div
          style={{
            width: '200px',
            height: '160px',
            backgroundColor: '#f4f4f4',
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            padding: '25px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onClick={() => handleNavigate("/admin/budget/expenditure")}
        >
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '12px',
            backgroundColor: '#ff9900'
          }}>
            <FileText size={32} color="#fff" />
          </div>
          <p style={{ margin: '0', fontSize: '18px', fontWeight: '500', color: '#333' }}>Expenditure</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;