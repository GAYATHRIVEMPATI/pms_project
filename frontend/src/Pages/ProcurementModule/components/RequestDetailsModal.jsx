import React, { useState } from 'react';
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaFileAlt,
  FaRupeeSign,
  FaBuilding,
  FaBox,
  FaUser,
  FaEdit,
  FaPaperPlane
} from 'react-icons/fa';
import procurementService from '../../../services/procurementService';

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Helper function to format status text
const formatStatus = (status) => {
  if (!status) return 'Unknown';
  return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

// Helper function to get status color
const getStatusColor = (status) => {
  if (status === 'approved' || status === 'fully_approved') {
    return 'text-green-600';
  } else if (status === 'rejected') {
    return 'text-red-600';
  } else {
    return 'text-yellow-600';
  }
};

// Helper function to get status icon
const getStatusIcon = (status) => {
  if (status === 'approved' || status === 'fully_approved') {
    return <FaCheckCircle className="text-green-600" />;
  } else if (status === 'rejected') {
    return <FaTimesCircle className="text-red-600" />;
  } else {
    return <FaTimesCircle className="text-yellow-600" />;
  }
};

const RequestDetailsModal = ({ isOpen, onClose, request, onRequestUpdate }) => {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  // In a real implementation, you would determine the user's role from auth context
  const userRole = 'admin'; // Mock user role

  // Handle approve action
  const handleApprove = async () => {
    if (!comment.trim()) {
      setError('Please provide a comment before approving.');
      return;
    }

    try {
      setLoading(true);

      // In a real implementation, we would determine the appropriate level
      // For now, we'll use a default level of 'departmentAdmin'
      const level = 'departmentAdmin';

      // Call the API to approve the request
      await procurementService.approveRequest(request._id, level, comment);

      // Notify parent component to update the request list
      if (onRequestUpdate) {
        onRequestUpdate(request);
      }

      setLoading(false);
      onClose();
    } catch (error) {
      setError('Failed to approve request');
      console.error('Error approving request:', error);
      setLoading(false);
    }
  };

  // Handle reject action
  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      setError('Please provide a reason for rejection.');
      return;
    }

    try {
      setLoading(true);

      // In a real implementation, we would determine the appropriate level
      // For now, we'll use a default level of 'departmentAdmin'
      const level = 'departmentAdmin';

      // Call the API to reject the request
      await procurementService.rejectRequest(request._id, level, rejectionReason);

      // Notify parent component to update the request list
      if (onRequestUpdate) {
        onRequestUpdate(request);
      }

      setLoading(false);
      onClose();
    } catch (error) {
      setError('Failed to reject request');
      console.error('Error rejecting request:', error);
      setLoading(false);
    }
  };

  if (!isOpen || !request) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Request Details</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="modal-content">
          {/* Request Basic Info */}
          <div className="info-grid">
            <div className="info-item">
              <FaFileAlt className="info-icon" />
              <div>
                <p className="info-label">Request ID</p>
                <p className="info-value">{request._id}</p>
              </div>
            </div>

            <div className="info-item">
              <FaCalendarAlt className="info-icon" />
              <div>
                <p className="info-label">Submission Date</p>
                <p className="info-value">{formatDate(request.submissionDate)}</p>
              </div>
            </div>

            <div className="info-item">
              <FaUser className="info-icon" />
              <div>
                <p className="info-label">Requested By</p>
                <p className="info-value">{request.userId?.name || 'Unknown'}</p>
              </div>
            </div>

            <div className="info-item">
              <div className="status-icon">{getStatusIcon(request.overallStatus)}</div>
              <div>
                <p className="info-label">Status</p>
                <span className={`status-badge ${getStatusColor(request.overallStatus)}`}>
                  {formatStatus(request.overallStatus)}
                </span>
              </div>
            </div>
          </div>

          {/* Request Details */}
          <div className="details-section">
            <h3 className="section-title">Item Details</h3>
            <div className="details-grid">
              <div className="detail-item">
                <p className="detail-label">Item Name</p>
                <p className="detail-value">{request.itemName}</p>
              </div>
              <div className="detail-item">
                <p className="detail-label">Department</p>
                <p className="detail-value">{request.department}</p>
              </div>
              <div className="detail-item">
                <p className="detail-label">Quantity</p>
                <p className="detail-value">{request.quantity}</p>
              </div>
              <div className="detail-item">
                <p className="detail-label">Single Item Cost</p>
                <p className="detail-value">${request.singleItemCost}</p>
              </div>
              <div className="detail-item">
                <p className="detail-label">Estimated Total Cost</p>
                <p className="detail-value">${request.estimatedCost}</p>
              </div>
              <div className="detail-item">
                <p className="detail-label">Justification</p>
                <p className="detail-value">{request.justification}</p>
              </div>
            </div>
          </div>

          {/* Rejection Reason (if rejected) */}
          {request.overallStatus === 'rejected' && request.rejectionReason && (
            <div className="rejection-section">
              <h3 className="section-title">Rejection Reason</h3>
              <p className="rejection-text">{request.rejectionReason}</p>
            </div>
          )}

          {/* Admin Actions */}
          {userRole === 'admin' && request.overallStatus === 'pending' && (
            <div className="actions-section">
              <h3 className="section-title">Actions</h3>

              {error && <div className="error-message">{error}</div>}

              <div className="comment-box">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="comment-input"
                />
              </div>

              <div className="action-buttons">
                <button
                  onClick={handleApprove}
                  disabled={loading}
                  className="approve-button"
                >
                  <FaCheckCircle className="button-icon" />
                  Approve
                </button>

                <div className="reject-container">
                  <input
                    type="text"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Reason for rejection"
                    className="reject-reason"
                  />
                  <button
                    onClick={handleReject}
                    disabled={loading}
                    className="reject-button"
                  >
                    <FaTimesCircle className="button-icon" />
                    Reject
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-container {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          width: 90%;
          max-width: 900px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          border-bottom: 1px solid #eee;
        }

        .modal-title {
          font-size: 20px;
          font-weight: 600;
          color: #333;
          margin: 0;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #666;
        }

        .modal-content {
          padding: 20px;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 25px;
        }

        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .info-icon {
          color: #666;
          margin-top: 3px;
        }

        .info-label {
          font-size: 13px;
          color: #666;
          margin: 0 0 5px 0;
        }

        .info-value {
          font-size: 15px;
          font-weight: 500;
          color: #333;
          margin: 0;
        }

        .status-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 500;
        }

        .details-section {
          background-color: #f9f9f9;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .section-title {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin: 0 0 15px 0;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 15px;
        }

        .detail-label {
          font-size: 13px;
          color: #666;
          margin: 0 0 5px 0;
        }

        .detail-value {
          font-size: 15px;
          color: #333;
          margin: 0;
        }

        .rejection-section {
          background-color: #fff0f0;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
          border: 1px solid #ffcccc;
        }

        .rejection-text {
          color: #d32f2f;
          margin: 0;
        }

        .actions-section {
          background-color: #f0f8ff;
          padding: 15px;
          border-radius: 8px;
          margin-top: 20px;
        }

        .error-message {
          color: #d32f2f;
          background-color: #ffebee;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 15px;
        }

        .comment-box {
          margin-bottom: 15px;
        }

        .comment-input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          min-height: 80px;
          resize: vertical;
        }

        .action-buttons {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .approve-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 15px;
          background-color: #4caf50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
        }

        .reject-container {
          display: flex;
          flex: 1;
          gap: 10px;
        }

        .reject-reason {
          flex: 1;
          padding: 8px 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .reject-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 15px;
          background-color: #f44336;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 500;
          white-space: nowrap;
        }

        .button-icon {
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default RequestDetailsModal;
