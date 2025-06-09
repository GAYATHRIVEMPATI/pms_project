import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaPlus, FaSearch, FaFilter } from 'react-icons/fa';
import RequestCard from './components/RequestCard';
import RequestDetailsModal from './components/RequestDetailsModal';
import procurementService from '../../services/procurementService';

const ProcurementRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Get status filter from URL query params
  const queryParams = new URLSearchParams(location.search);
  const statusFilter = queryParams.get('status');

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError('');
      try {
        // Fetch requests from the API
        const data = await procurementService.getAllRequests();
        setRequests(data);
      } catch (err) {
        setError('Failed to fetch requests');
        console.error('Fetch requests error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Function to open modal with selected request
  const handleRequestClick = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  // Function to close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Function to update request after approval/rejection
  const handleRequestUpdate = async (updatedRequest) => {
    try {
      // Refresh the requests list after an update
      const data = await procurementService.getAllRequests();
      setRequests(data);
    } catch (err) {
      setError('Failed to refresh requests');
      console.error('Refresh requests error:', err);
    }
  };

  // Function to create new request
  const handleCreateRequest = () => {
    navigate('/admin/procurement/new-request');
  };

  // Filter requests by status if statusFilter is provided
  const filteredRequests = statusFilter
    ? requests.filter(req => req.overallStatus === statusFilter)
    : requests;

  // Further filter by search term
  const searchedRequests = searchTerm
    ? filteredRequests.filter(req =>
        req.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req._id.includes(searchTerm)
      )
    : filteredRequests;

  // Group requests by status
  const pendingRequests = searchedRequests.filter(req => req.overallStatus === 'pending');
  const approvedRequests = searchedRequests.filter(req => req.overallStatus === 'approved');
  const rejectedRequests = searchedRequests.filter(req => req.overallStatus === 'rejected');

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading requests...</div>;
  }

  if (error) {
    return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded m-4">{error}</div>;
  }

  return (
    <div className="procurement-requests">
      <div className="header">
        <h2 className="title">Procurement Requests</h2>
        <div className="actions">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button className="create-button" onClick={handleCreateRequest}>
            <FaPlus className="button-icon" />
            New Request
          </button>
        </div>
      </div>

      <div className="requests-container">
        {/* Pending Requests Column */}
        <div className="status-column pending">
          <h3 className="column-title">
            Pending
            <span className="count-badge">{pendingRequests.length}</span>
          </h3>
          <div className="requests-list">
            {pendingRequests.length === 0 ? (
              <p className="empty-message">No pending requests</p>
            ) : (
              pendingRequests.map(request => (
                <RequestCard
                  key={request._id}
                  request={request}
                  onClick={() => handleRequestClick(request)}
                />
              ))
            )}
          </div>
        </div>

        {/* Approved Requests Column */}
        <div className="status-column approved">
          <h3 className="column-title">
            Approved
            <span className="count-badge">{approvedRequests.length}</span>
          </h3>
          <div className="requests-list">
            {approvedRequests.length === 0 ? (
              <p className="empty-message">No approved requests</p>
            ) : (
              approvedRequests.map(request => (
                <RequestCard
                  key={request._id}
                  request={request}
                  onClick={() => handleRequestClick(request)}
                />
              ))
            )}
          </div>
        </div>

        {/* Rejected Requests Column */}
        <div className="status-column rejected">
          <h3 className="column-title">
            Rejected
            <span className="count-badge">{rejectedRequests.length}</span>
          </h3>
          <div className="requests-list">
            {rejectedRequests.length === 0 ? (
              <p className="empty-message">No rejected requests</p>
            ) : (
              rejectedRequests.map(request => (
                <RequestCard
                  key={request._id}
                  request={request}
                  onClick={() => handleRequestClick(request)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Request Details Modal */}
      {selectedRequest && (
        <RequestDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          request={selectedRequest}
          onRequestUpdate={handleRequestUpdate}
        />
      )}

      <style>{`
        .procurement-requests {
          padding: 20px;
          background-color: #f8f9fa;
          height: 100%;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .title {
          font-size: 24px;
          font-weight: bold;
          color: #333;
        }

        .actions {
          display: flex;
          gap: 15px;
        }

        .search-container {
          position: relative;
          width: 300px;
        }

        .search-icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: #888;
        }

        .search-input {
          width: 100%;
          padding: 10px 10px 10px 35px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
        }

        .create-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 15px;
          background-color: #a63b2e;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.2s;
        }

        .create-button:hover {
          background-color: #8a3226;
        }

        .button-icon {
          font-size: 14px;
        }

        .requests-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          height: calc(100vh - 200px);
        }

        .status-column {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          padding: 15px;
          display: flex;
          flex-direction: column;
        }

        .column-title {
          font-size: 16px;
          font-weight: 600;
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .pending .column-title {
          color: #f4ad42;
        }

        .approved .column-title {
          color: #249624;
        }

        .rejected .column-title {
          color: #ef6161;
        }

        .count-badge {
          background-color: #f0f0f0;
          color: #666;
          font-size: 12px;
          padding: 2px 8px;
          border-radius: 10px;
        }

        .requests-list {
          overflow-y: auto;
          flex-grow: 1;
        }

        .empty-message {
          text-align: center;
          color: #888;
          padding: 20px 0;
        }
      `}</style>
    </div>
  );
};

export default ProcurementRequests;
