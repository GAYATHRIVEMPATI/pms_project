import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with auth token
const getAuthHeader = () => {
  const sessionId = localStorage.getItem('session_id');
  return sessionId ? { 'Authorization': `Bearer ${sessionId}` } : {};
};

// Helper function to handle file uploads
const uploadFile = async (endpoint, formData) => {
  try {
    const response = await axios.post(`${API_URL}${endpoint}`, formData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error.response?.data || { message: error.message };
  }
};

// Helper function for regular API calls
const apiCall = async (method, endpoint, data = null) => {
  try {
    const config = {
      headers: getAuthHeader()
    };

    let response;
    if (method === 'get') {
      response = await axios.get(`${API_URL}${endpoint}`, config);
    } else if (method === 'post') {
      response = await axios.post(`${API_URL}${endpoint}`, data, config);
    } else if (method === 'put') {
      response = await axios.put(`${API_URL}${endpoint}`, data, config);
    } else if (method === 'delete') {
      response = await axios.delete(`${API_URL}${endpoint}`, config);
    }

    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error.response?.data || { message: error.message };
  }
};

const procurementService = {
  // Create a new procurement request
  createRequest: async (requestData) => {
    try {
      console.log('Sending request data:', requestData);
      const formData = new FormData();

      // Add all non-file fields
      Object.keys(requestData).forEach(key => {
        if (key !== 'attachments') {
          formData.append(key, requestData[key]);
        }
      });

      // Add files if they exist
      if (requestData.attachments && requestData.attachments.length > 0) {
        requestData.attachments.forEach(file => {
          formData.append('attachments', file);
        });
      }

      return await uploadFile('/procurement-requests', formData);
    } catch (error) {
      console.error('Error in createRequest:', error);
      throw error;
    }
  },

  // Get all procurement requests
  getAllRequests: async () => {
    return await apiCall('get', '/procurement-requests');
  },

  // Get a single procurement request by ID
  getRequestById: async (id) => {
    return await apiCall('get', `/procurement-requests/${id}`);
  },

  // Update a procurement request
  updateRequest: async (id, requestData) => {
    try {
      const formData = new FormData();

      // Add all non-file fields
      Object.keys(requestData).forEach(key => {
        if (key !== 'attachments') {
          formData.append(key, requestData[key]);
        }
      });

      // Add new files if they exist
      if (requestData.attachments && requestData.attachments.length > 0) {
        requestData.attachments.forEach(file => {
          if (file instanceof File) {
            formData.append('attachments', file);
          }
        });
      }

      return await uploadFile(`/procurement-requests/${id}`, formData);
    } catch (error) {
      console.error('Error in updateRequest:', error);
      throw error;
    }
  },

  // Approve a procurement request
  approveRequest: async (id, level, comment) => {
    return await apiCall('post', `/procurement-requests/${id}/approve`, { level, comment });
  },

  // Reject a procurement request
  rejectRequest: async (id, level, reason) => {
    return await apiCall('post', `/procurement-requests/${id}/reject`, { level, reason });
  },

  // Get procurement statistics
  getStatistics: async () => {
    try {
      return await apiCall('get', '/procurement-requests/statistics');
    } catch (error) {
      console.error('Error fetching statistics:', error);
      // Return default values if API fails
      return {
        totalRequests: 0,
        approvedRequests: 0,
        pendingRequests: 0,
        rejectedRequests: 0,
        totalApprovedCost: 0
      };
    }
  }
};

export default procurementService;
