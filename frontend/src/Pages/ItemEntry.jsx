import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ItemEntry = () => {
  const [poNumbers, setPoNumbers] = useState([]);
  const [selectedPOInfo, setSelectedPOInfo] = useState(null);
  const [formData, setFormData] = useState({
    poNumber: '',
    itemType: '',
    itemName: '',
    itemVariant: '',
    department: '',
    itemDescription: '',
    dateOfReceipt: '',
    functionalQty: '',
    damagedQty: '',
    rejectionStatus: '',
  });

  const fetchPONumbers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/po');
      // Filter out POs with itemCount === 0
      setPoNumbers(res.data.filter(po => po.itemCount > 0));
    } catch (err) {
      console.error('Failed to fetch PO numbers:', err);
    }
  };

  useEffect(() => {
    fetchPONumbers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'poNumber') {
      const poInfo = poNumbers.find(po => po.poNumber === value);
      setSelectedPOInfo(poInfo || null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const functionalQty = parseInt(formData.functionalQty || "0", 10);
    const damagedQty = parseInt(formData.damagedQty || "0", 10);

    const payload = {
      poNumber: formData.poNumber,
      itemType: formData.itemType,
      itemName: formData.itemName,
      itemVariant: formData.itemVariant,
      department: formData.department,
      itemDescription: formData.itemDescription,
      functionalQty,
      damagedQty,
      dateOfReceipt: formData.dateOfReceipt,
      rejectionStatus: formData.rejectionStatus,
    };

    try {
      await axios.post('http://localhost:5000/api/items', payload);

      // Handle removal of PO if rejected and no replacement
      if (formData.rejectionStatus === 'Rejected and No Replacement') {
        await axios.delete(`http://localhost:5000/api/po/${formData.poNumber}`);
      }

      alert('Item recorded successfully!');
      setFormData({
        poNumber: '',
        itemType: '',
        itemName: '',
        itemVariant: '',
        department: '',
        itemDescription: '',
        dateOfReceipt: '',
        functionalQty: '',
        damagedQty: '',
        rejectionStatus: '',
      });
      setSelectedPOInfo(null);
      await fetchPONumbers(); // Refresh PO dropdown
    } catch (error) {
      console.error('Error submitting item:', error);
      alert(error.response?.data?.error || 'Submission failed');
    }
  };

  // Styles
  const containerStyle = {
    maxWidth: '600px',
    margin: 'auto',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  };

  const formStyle = { display: 'flex', flexDirection: 'column', gap: '20px' };
  const rowStyle = { display: 'flex', gap: '20px', flexWrap: 'wrap' };
  const fieldStyle = { flex: 1, minWidth: '250px' };
  const labelStyle = { fontWeight: 'bold', display: 'block', marginBottom: '5px' };
  const inputStyle = { width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' };
  const buttonStyle = {
    padding: '12px 24px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Item Entry Form</h2>
      <form onSubmit={handleSubmit} style={formStyle}>

        {/* PO and Item Type */}
        <div style={rowStyle}>
          <div style={fieldStyle}>
            <label style={labelStyle}>PO Number</label>
            <select name="poNumber" value={formData.poNumber} onChange={handleChange} required style={inputStyle}>
              <option value="">Select PO Number</option>
              {poNumbers.map(po => (
                <option key={po._id} value={po.poNumber}>
                  {po.poNumber}
                </option>
              ))}
            </select>
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Item Type</label>
            <input type="text" name="itemType" value={formData.itemType} onChange={handleChange} required style={inputStyle} />
          </div>
        </div>

        {/* Item Name and Variant */}
        <div style={rowStyle}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Item Name</label>
            <input type="text" name="itemName" value={formData.itemName} onChange={handleChange} required style={inputStyle} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Item Variant</label>
            <input type="text" name="itemVariant" value={formData.itemVariant} onChange={handleChange} style={inputStyle} />
          </div>
        </div>

        {/* Department and Description */}
        <div style={rowStyle}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Department</label>
            <select name="department" value={formData.department} onChange={handleChange} required style={inputStyle}>
              <option value="">Select Department</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="CSE">CSE</option>
              <option value="MECH">MECH</option>
            </select>
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Item Description</label>
            <textarea name="itemDescription" value={formData.itemDescription} onChange={handleChange} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
        </div>

        {/* Functional and Damaged Quantity */}
        <div style={rowStyle}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Functional Quantity</label>
            <input type="number" name="functionalQty" value={formData.functionalQty} onChange={handleChange} min="0" required style={inputStyle} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Damaged Quantity</label>
            <input type="number" name="damagedQty" value={formData.damagedQty} onChange={handleChange} min="0" required style={inputStyle} />
          </div>
        </div>

        {/* Rejection Status Dropdown */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Rejection Status</label>
          <select name="rejectionStatus" value={formData.rejectionStatus} onChange={handleChange} required style={inputStyle}>
            <option value="">Select Status</option>
            <option value="Accepted and No Replacement">Accepted and No Replacement</option>
            <option value="Rejected and Replacement">Rejected and Replacement</option>
            <option value="Rejected and No Replacement">Rejected and No Replacement</option>
          </select>
        </div>

        {/* Date of Receipt */}
        <div style={fieldStyle}>
          <label style={labelStyle}>Date of Receipt</label>
          <input type="date" name="dateOfReceipt" value={formData.dateOfReceipt} onChange={handleChange} required style={inputStyle} />
        </div>

        {/* Submit */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button type="submit" style={buttonStyle}>Record Item</button>
        </div>
      </form>
    </div>
  );
};

export default ItemEntry;
