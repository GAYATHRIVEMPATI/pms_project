import React, { useState, useEffect } from 'react';
import { FaClipboardList, FaCheckCircle, FaClock, FaTimesCircle, FaRupeeSign } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import procurementService from '../../services/procurementService';

const ProcurementDashboard = () => {
  const [stats, setStats] = useState({
    totalRequests: 0,
    approvedRequests: 0,
    pendingRequests: 0,
    rejectedRequests: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch statistics directly from the statistics endpoint
        const data = await procurementService.getStatistics();

        setStats({
          totalRequests: data.totalRequests,
          approvedRequests: data.approvedRequests,
          pendingRequests: data.pendingRequests,
          rejectedRequests: data.rejectedRequests
        });
      } catch (error) {
        console.error('Error fetching procurement stats:', error);
        // Error handling is done in the service
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleCardClick = (route) => {
    navigate(route);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  return (
    <div className="procurement-dashboard">
      <h2 className="dashboard-title">Procurement Dashboard</h2>

      {/* Requests Summary Section */}
      <h3 className="section-title">Requests</h3>
      <div className="summary-section">
        <div
          className="card total-requests"
          onClick={() => handleCardClick('/admin/procurement/requests')}
        >
          <div className="card-header">
            <FaClipboardList className="dashboard-icon total-icon" />
            <span className="card-title">Total Requests</span>
          </div>
          <div className="card-count">
            <span>Count:</span> <span className="card-value">{stats.totalRequests}</span>
          </div>
        </div>

        <div
          className="card approved-requests"
          onClick={() => handleCardClick('/admin/procurement/requests?status=approved')}
        >
          <div className="card-header">
            <FaCheckCircle className="dashboard-icon approved-icon" />
            <span className="card-title">Approved Requests</span>
          </div>
          <div className="card-count">
            <span>Count:</span> <span className="card-value">{stats.approvedRequests}</span>
          </div>
        </div>

        <div
          className="card pending-requests"
          onClick={() => handleCardClick('/admin/procurement/requests?status=pending')}
        >
          <div className="card-header">
            <FaClock className="dashboard-icon pending-icon" />
            <span className="card-title">Pending Approvals</span>
          </div>
          <div className="card-count">
            <span>Count:</span> <span className="card-value">{stats.pendingRequests}</span>
          </div>
        </div>

        <div
          className="card rejected-requests"
          onClick={() => handleCardClick('/admin/procurement/requests?status=rejected')}
        >
          <div className="card-header">
            <FaTimesCircle className="dashboard-icon rejected-icon" />
            <span className="card-title">Rejected Requests</span>
          </div>
          <div className="card-count">
            <span>Count:</span> <span className="card-value">{stats.rejectedRequests}</span>
          </div>
        </div>
      </div>

      <style>{`
        .procurement-dashboard {
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .dashboard-title {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
          color: #333;
        }

        .section-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 15px;
          color: #555;
        }

        .summary-section {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 30px;
        }

        .card {
          flex: 1;
          min-width: 200px;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .card-header {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
        }

        .dashboard-icon {
          font-size: 24px;
          margin-right: 10px;
        }

        .card-title {
          font-size: 16px;
          font-weight: 600;
        }

        .card-count {
          font-size: 14px;
        }

        .card-value {
          font-size: 24px;
          font-weight: bold;
          margin-left: 5px;
        }

        /* Card Colors */
        .total-requests {
          background-color: #fdecec;
          color: #f56565;
        }
        .approved-requests {
          background-color: #e7f7e7;
          color: #249624;
        }
        .pending-requests {
          background-color: #fef4e5;
          color: #f4ad42;
        }
        .rejected-requests {
          background-color: #fde8e8;
          color: #ef6161;
        }

        /* Icon Colors */
        .total-icon { color: #f56565; }
        .approved-icon { color: #249624; }
        .pending-icon { color: #f4ad42; }
        .rejected-icon { color: #ef6161; }
      `}</style>
    </div>
  );
};

export default ProcurementDashboard;
