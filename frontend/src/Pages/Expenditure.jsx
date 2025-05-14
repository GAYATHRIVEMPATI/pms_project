import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppContext } from "../Context/AppContext";

const Expenditure = () => {
  const { selectedDepartment } = useAppContext();
  const [totalDepartmentExpenditure, setTotalDepartmentExpenditure] = useState(0);
  const [productId, setProductId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reports, setReports] = useState([]);
  const [productTotal, setProductTotal] = useState(0);
  const [error, setError] = useState('');

  // Fetch total department expenditure
  const fetchDepartmentTotal = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/expenditure/department-total', {
        department: selectedDepartment
      });
      setTotalDepartmentExpenditure(res.data.total);
    } catch (err) {
      console.error("Error fetching department total", err);
    }
  };

  // Filter reports by product and/or date
  const fetchFilteredExpenditure = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/expenditure/search', {
        department: selectedDepartment,
        productId: productId || null,
        startDate: startDate || null,
        endDate: endDate || null
      });

      if (res.data.details.length === 0) {
        setError("No matching products found.");
        setReports([]);
        setProductTotal(0);
      } else {
        setReports(res.data.details);
        setProductTotal(res.data.totalExpenditure);
        setError('');
      }
    } catch (err) {
      console.error("Error filtering expenditure", err);
      setError("An error occurred while filtering data.");
    }
  };

  // Reset filters
  const resetFilters = () => {
    setProductId('');
    setStartDate('');
    setEndDate('');
    fetchFilteredExpenditure(); // Reset the filtered data when filters are cleared
  };

  useEffect(() => {
    if (selectedDepartment) {
      fetchDepartmentTotal();  // fetch only once
    }
  }, [selectedDepartment]);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchFilteredExpenditure();
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
      <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
        Expenditure for Department: {selectedDepartment}
      </h2>
      <p style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '20px', color: '#333' }}>
        Total Department Expenditure: ₹{totalDepartmentExpenditure}
      </p>

      <form onSubmit={handleFilter} style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', marginBottom: '24px' }}>
        <input
          type="text"
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          style={{
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            width: '200px',
          }}
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={{
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            width: '200px',
          }}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={{
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px',
            width: '200px',
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#007BFF',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            border: 'none',
            fontSize: '14px',
          }}
        >
          Search
        </button>
        <button
          type="button"
          onClick={resetFilters}
          style={{
            backgroundColor: '#dc3545',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            border: 'none',
            fontSize: '14px',
          }}
        >
          Reset Filters
        </button>
      </form>

      {error && (
        <p style={{ color: '#dc3545', fontWeight: '600', marginBottom: '20px' }}>{error}</p>
      )}

      {reports.length > 0 && (
        <>
          <p style={{ fontSize: '1.25rem', fontWeight: '500', marginBottom: '20px', color: '#333' }}>
            Total Product Expenditure: ₹{productTotal}
          </p>
          <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '80%', margin: '0 auto', border: '1px solid #ccc', backgroundColor: '#fff', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '4px' }}>
          <thead style={{ backgroundColor: '#f4f4f4' }}>
          <tr>
          <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ccc' }}>Product ID</th>
          <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ccc' }}>Product Name</th>
          <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ccc' }}>Amount</th>
          <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ccc' }}>Date</th>
        </tr>
        </thead>
        <tbody>
      {reports.map((r, index) => (
        <tr key={index} style={{ cursor: 'pointer', backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
          <td style={{ padding: '12px', borderBottom: '1px solid #ccc', textAlign: 'center' }}>{r.productId}</td>
          <td style={{ padding: '12px', borderBottom: '1px solid #ccc', textAlign: 'center' }}>{r.productName}</td>
          <td style={{ padding: '12px', borderBottom: '1px solid #ccc', textAlign: 'center' }}>₹{r.expenditureAmount}</td>
          <td style={{ padding: '12px', borderBottom: '1px solid #ccc', textAlign: 'center' }}>
            {new Date(r.date).toLocaleDateString()}
          </td>
        </tr>
      ))}
        </tbody>
        </table>
      </div>

        </>
      )}
    </div>
  );
};

export default Expenditure;