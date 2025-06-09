import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUpload,
  FaRupeeSign,
  FaFileAlt,
  FaPaperPlane,
  FaBox,
  FaHashtag,
  FaBuilding,
  FaArrowLeft
} from 'react-icons/fa';
import procurementService from '../../services/procurementService';

const DEPARTMENTS = [
  { id: 'it', name: 'Information Technology' },
  { id: 'hr', name: 'Human Resources' },
  { id: 'finance', name: 'Finance' },
  { id: 'operations', name: 'Operations' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'sales', name: 'Sales' },
  { id: 'rd', name: 'Research & Development' },
  { id: 'admin', name: 'Administration' }
];

const NewRequest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    itemName: '',
    itemDescription: '',
    quantity: '1',
    singleItemCost: '',
    estimatedCost: '0',
    department: '',
    justification: '',
    attachments: []
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // In a real implementation, you would get the user's department from auth context
  useEffect(() => {
    // Mock user data
    const userDepartment = 'it';
    setFormData(prev => ({
      ...prev,
      department: userDepartment
    }));
  }, []);

  // Calculate estimated cost when quantity or singleItemCost changes
  useEffect(() => {
    const quantity = parseInt(formData.quantity) || 0;
    const cost = parseFloat(formData.singleItemCost) || 0;
    const estimated = (quantity * cost).toFixed(2);

    setFormData(prev => ({
      ...prev,
      estimatedCost: estimated
    }));
  }, [formData.quantity, formData.singleItemCost]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate form data
      if (!formData.itemName || !formData.department || !formData.justification) {
        throw new Error('Please fill in all required fields');
      }

      // Convert string values to numbers
      const submitData = {
        ...formData,
        quantity: parseInt(formData.quantity),
        singleItemCost: parseFloat(formData.singleItemCost),
        estimatedCost: parseFloat(formData.estimatedCost)
      };

      // Submit the request to the API
      await procurementService.createRequest(submitData);

      // Navigate back to the requests page on success
      navigate('/admin/procurement/requests');
    } catch (err) {
      setError(err.message || 'Failed to submit request');
      console.error('Submit error:', err);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        attachments: Array.from(files)
      }));
      setUploadedFiles(Array.from(files).map(file => file.name));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleBack = () => {
    navigate('/admin/procurement/requests');
  };

  return (
    <div className="new-request-container">
      <div className="header">
        <button className="back-button" onClick={handleBack}>
          <FaArrowLeft className="back-icon" />
          Back to Requests
        </button>
        <h2 className="title">New Procurement Request</h2>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="request-form">
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">
              Item Name <span className="required">*</span>
            </label>
            <div className="input-container">
              <FaBox className="input-icon" />
              <input
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Department <span className="required">*</span>
            </label>
            <div className="input-container">
              <FaBuilding className="input-icon" />
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="">Select Department</option>
                {DEPARTMENTS.map(dept => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Item Description <span className="required">*</span>
            </label>
            <div className="input-container">
              <FaFileAlt className="input-icon" />
              <textarea
                name="itemDescription"
                value={formData.itemDescription}
                onChange={handleChange}
                className="form-textarea"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Justification <span className="required">*</span>
            </label>
            <div className="input-container">
              <FaFileAlt className="input-icon" />
              <textarea
                name="justification"
                value={formData.justification}
                onChange={handleChange}
                className="form-textarea"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Quantity <span className="required">*</span>
            </label>
            <div className="input-container">
              <FaHashtag className="input-icon" />
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Single Item Cost <span className="required">*</span>
            </label>
            <div className="input-container">
              <FaRupeeSign className="input-icon" />
              <input
                type="number"
                name="singleItemCost"
                value={formData.singleItemCost}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Estimated Total Cost
            </label>
            <div className="input-container">
              <FaRupeeSign className="input-icon" />
              <input
                type="text"
                name="estimatedCost"
                value={formData.estimatedCost}
                readOnly
                className="form-input readonly"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">
              Attachments
            </label>
            <div className="file-upload">
              <label className="upload-button">
                <FaUpload className="upload-icon" />
                Choose Files
                <input
                  type="file"
                  name="attachments"
                  onChange={handleChange}
                  multiple
                  className="hidden-input"
                />
              </label>
              <span className="file-info">
                {uploadedFiles.length > 0
                  ? `${uploadedFiles.length} file(s) selected`
                  : 'No files selected'}
              </span>
            </div>
            {uploadedFiles.length > 0 && (
              <ul className="file-list">
                {uploadedFiles.map((fileName, index) => (
                  <li key={index} className="file-item">{fileName}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={handleBack}
            className="cancel-button"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="submit-button"
          >
            {loading ? (
              'Submitting...'
            ) : (
              <>
                <FaPaperPlane className="button-icon" />
                Submit Request
              </>
            )}
          </button>
        </div>
      </form>

      <style jsx>{`
        .new-request-container {
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 8px;
        }

        .header {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }

        .back-button {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 8px 12px;
          background-color: #f0f0f0;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-right: 15px;
        }

        .back-icon {
          font-size: 14px;
        }

        .title {
          font-size: 24px;
          font-weight: bold;
          color: #333;
          margin: 0;
        }

        .error-message {
          background-color: #ffebee;
          color: #d32f2f;
          padding: 12px;
          border-radius: 4px;
          margin-bottom: 20px;
        }

        .request-form {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #555;
        }

        .required {
          color: #d32f2f;
        }

        .input-container {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: #888;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 10px 10px 10px 35px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
        }

        .form-textarea {
          min-height: 100px;
          resize: vertical;
          padding-top: 30px;
        }

        .readonly {
          background-color: #f9f9f9;
          cursor: not-allowed;
        }

        .file-upload {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .upload-button {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 8px 12px;
          background-color: #f0f0f0;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
        }

        .hidden-input {
          display: none;
        }

        .file-info {
          font-size: 14px;
          color: #666;
        }

        .file-list {
          list-style: none;
          padding: 0;
          margin: 10px 0 0 0;
        }

        .file-item {
          font-size: 13px;
          color: #666;
          margin-bottom: 5px;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 15px;
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }

        .cancel-button {
          padding: 10px 15px;
          background-color: #f0f0f0;
          border: 1px solid #ddd;
          border-radius: 4px;
          cursor: pointer;
        }

        .submit-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 15px;
          background-color: #a63b2e;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
        }

        .submit-button:hover {
          background-color: #8a3226;
        }

        .button-icon {
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default NewRequest;
