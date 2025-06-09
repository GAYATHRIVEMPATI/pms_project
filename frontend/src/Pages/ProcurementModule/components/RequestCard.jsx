import React from 'react';
import { FaCalendarAlt, FaRupeeSign, FaBox, FaBuilding } from 'react-icons/fa';

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

// Helper function to get status color for badge
const getStatusColor = (status) => {
  if (status === 'approved' || status === 'fully_approved') {
    return 'bg-green-100 text-green-800';
  } else if (status === 'rejected') {
    return 'bg-red-100 text-red-800';
  } else {
    return 'bg-yellow-100 text-yellow-800';
  }
};

// Helper function to get card border color based on status
const getCardBorderColor = (status) => {
  if (status === 'approved' || status === 'fully_approved') {
    return 'border-l-4 border-l-green-500';
  } else if (status === 'rejected') {
    return 'border-l-4 border-l-red-500';
  } else {
    return 'border-l-4 border-l-yellow-500';
  }
};

// Helper function to get card background color based on status
const getCardBgColor = (status) => {
  if (status === 'approved' || status === 'fully_approved') {
    return 'bg-green-50';
  } else if (status === 'rejected') {
    return 'bg-red-50';
  } else {
    return 'bg-yellow-50';
  }
};

const RequestCard = ({ request, onClick }) => {
  return (
    <div
      className="request-card"
      onClick={onClick}
      data-status={request.overallStatus}
    >
      <div className="card-header">
        <h3 className="item-name">{request.itemName}</h3>
        <span className="status-badge" data-status={request.overallStatus}>
          {formatStatus(request.overallStatus)}
        </span>
      </div>

      <div className="card-details">
        <div className="detail-item">
          <FaBuilding className="detail-icon" />
          <span className="detail-text">{request.department}</span>
        </div>

        <div className="detail-item">
          <FaCalendarAlt className="detail-icon" />
          <span className="detail-text">{formatDate(request.submissionDate)}</span>
        </div>

        <div className="detail-item">
          <FaRupeeSign className="detail-icon" />
          <span className="detail-text">${request.estimatedCost}</span>
        </div>

        <div className="detail-item">
          <FaBox className="detail-icon" />
          <span className="detail-text">Qty: {request.quantity}</span>
        </div>
      </div>

      {/* Rejection reason if rejected */}
      {request.overallStatus === 'rejected' && request.rejectionReason && (
        <div className="rejection-reason">
          <strong>Reason:</strong> {request.rejectionReason.length > 50
            ? `${request.rejectionReason.substring(0, 50)}...`
            : request.rejectionReason}
        </div>
      )}

      <style jsx>{`
        .request-card {
          padding: 15px;
          margin-bottom: 15px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          border: 1px solid #eee;
        }

        .request-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .request-card[data-status="approved"],
        .request-card[data-status="fully_approved"] {
          border-left: 4px solid #249624;
          background-color: #f0fff0;
        }

        .request-card[data-status="rejected"] {
          border-left: 4px solid #ef6161;
          background-color: #fff0f0;
        }

        .request-card[data-status="pending"] {
          border-left: 4px solid #f4ad42;
          background-color: #fffaf0;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .item-name {
          font-weight: 600;
          font-size: 16px;
          color: #333;
          margin: 0;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .status-badge {
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
        }

        .status-badge[data-status="approved"],
        .status-badge[data-status="fully_approved"] {
          background-color: #e7f7e7;
          color: #249624;
        }

        .status-badge[data-status="rejected"] {
          background-color: #fde8e8;
          color: #ef6161;
        }

        .status-badge[data-status="pending"] {
          background-color: #fef4e5;
          color: #f4ad42;
        }

        .card-details {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 10px;
        }

        .detail-item {
          display: flex;
          align-items: center;
          font-size: 13px;
          color: #666;
        }

        .detail-icon {
          margin-right: 6px;
          font-size: 14px;
          color: #888;
        }

        .rejection-reason {
          margin-top: 10px;
          padding-top: 8px;
          border-top: 1px solid #eee;
          font-size: 13px;
          color: #ef6161;
        }
      `}</style>
    </div>
  );
};

export default RequestCard;
