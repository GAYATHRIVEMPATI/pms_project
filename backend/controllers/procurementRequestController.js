const ProcurementRequest = require('../models/ProcurementRequest');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
}).array('attachments', 5); // Allow up to 5 files

// Create a new procurement request
exports.createRequest = (req, res) => {
  upload(req, res, async function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: `Upload error: ${err.message}` });
    } else if (err) {
      return res.status(500).json({ message: `Server error: ${err.message}` });
    }

    try {
      // Process uploaded files
      const attachments = req.files ? req.files.map(file => ({
        filename: file.originalname,
        path: file.path,
        mimetype: file.mimetype,
        size: file.size
      })) : [];

      // Create new request
      const request = new ProcurementRequest({
        itemName: req.body.itemName,
        itemDescription: req.body.itemDescription,
        quantity: parseInt(req.body.quantity),
        singleItemCost: parseFloat(req.body.singleItemCost),
        estimatedCost: parseFloat(req.body.estimatedCost),
        department: req.body.department,
        justification: req.body.justification,
        attachments: attachments,
        userId: req.user._id, // Assuming user is attached by auth middleware
        // Set default values for approval statuses
        departmentAdminApproved: false,
        procurementAdminApproved: false,
        deanAdminApproved: false,
      });

      await request.save();
      res.status(201).json(request);
    } catch (error) {
      console.error('Error creating procurement request:', error);
      res.status(500).json({ message: 'Failed to create procurement request', error: error.message });
    }
  });
};

// Get all procurement requests (with filtering based on user role)
exports.getAllRequests = async (req, res) => {
  try {
    let query = {};

    // Filter requests based on user role
    if (req.user.role === 'user') {
      // Regular users can only see their own requests
      query.userId = req.user._id;
    } else if (req.user.role === 'department_admin') {
      // Department admins can see requests from their department
      query.department = req.user.department;
    }
    // Admin and other roles can see all requests (no filter)

    const requests = await ProcurementRequest.find(query)
      .populate('userId', 'name email department')
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching procurement requests:', error);
    res.status(500).json({ message: 'Failed to fetch procurement requests', error: error.message });
  }
};

// Get a single procurement request by ID
exports.getRequestById = async (req, res) => {
  try {
    const request = await ProcurementRequest.findById(req.params.id)
      .populate('userId', 'name email department');

    if (!request) {
      return res.status(404).json({ message: 'Procurement request not found' });
    }

    // Check if user has permission to view this request
    if (req.user.role === 'user' && request.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You do not have permission to view this request' });
    }

    if (req.user.role === 'department_admin' && request.department !== req.user.department) {
      return res.status(403).json({ message: 'You do not have permission to view this request' });
    }

    res.status(200).json(request);
  } catch (error) {
    console.error('Error fetching procurement request:', error);
    res.status(500).json({ message: 'Failed to fetch procurement request', error: error.message });
  }
};

// Update a procurement request
exports.updateRequest = async (req, res) => {
  try {
    const request = await ProcurementRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Procurement request not found' });
    }

    // Check if user has permission to update this request
    if (req.user.role === 'user' && request.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You do not have permission to update this request' });
    }

    // Only allow updates if the request is in rejected status or user is admin
    if (req.user.role === 'user' && request.overallStatus !== 'rejected') {
      return res.status(403).json({ message: 'You can only edit rejected requests' });
    }

    // Update fields
    request.itemName = req.body.itemName || request.itemName;
    request.itemDescription = req.body.itemDescription || request.itemDescription;
    request.quantity = req.body.quantity || request.quantity;
    request.singleItemCost = req.body.singleItemCost || request.singleItemCost;
    request.estimatedCost = req.body.estimatedCost || request.estimatedCost;
    request.justification = req.body.justification || request.justification;

    // If user is editing a rejected request, reset approval statuses
    if (req.user.role === 'user' && request.overallStatus === 'rejected') {
      request.approvalStatus = {
        departmentAdmin: { status: 'pending' },
        procurementAdmin: { status: 'pending' },
        dean: { status: 'pending' }
      };
      request.overallStatus = 'pending_dept_approval';
      request.rejectionReason = null;
      request.rejectedByLevel = null;
    }

    request.updatedAt = Date.now();

    await request.save();
    res.status(200).json(request);
  } catch (error) {
    console.error('Error updating procurement request:', error);
    res.status(500).json({ message: 'Failed to update procurement request', error: error.message });
  }
};

// Approve a procurement request
exports.approveRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { level, comment } = req.body;

    if (!level) {
      return res.status(400).json({ message: 'Approval level is required' });
    }

    const request = await ProcurementRequest.findById(id);

    if (!request) {
      return res.status(404).json({ message: 'Procurement request not found' });
    }

    // Check if user has permission to approve at this level
    if (
      (level === 'departmentAdmin' && req.user.role !== 'department_admin') ||
      (level === 'procurementAdmin' && req.user.role !== 'procurement_admin') ||
      (level === 'dean' && req.user.role !== 'dean_admin')
    ) {
      return res.status(403).json({ message: 'You do not have permission to approve at this level' });
    }

    // Update approval status
    request.approvalStatus[level] = {
      status: 'approved',
      approverId: req.user._id,
      approverName: req.user.name,
      timestamp: Date.now(),
      comments: comment
    };

    // Add comment
    if (comment) {
      request.comments.push({
        text: comment,
        authorId: req.user._id,
        authorName: req.user.name,
        action: 'approved',
        level: level
      });
    }

    await request.save();
    res.status(200).json(request);
  } catch (error) {
    console.error('Error approving procurement request:', error);
    res.status(500).json({ message: 'Failed to approve procurement request', error: error.message });
  }
};

// Reject a procurement request
exports.rejectRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { level, reason } = req.body;

    if (!level || !reason) {
      return res.status(400).json({ message: 'Rejection level and reason are required' });
    }

    const request = await ProcurementRequest.findById(id);

    if (!request) {
      return res.status(404).json({ message: 'Procurement request not found' });
    }

    // Check if user has permission to reject at this level
    if (
      (level === 'departmentAdmin' && req.user.role !== 'department_admin') ||
      (level === 'procurementAdmin' && req.user.role !== 'procurement_admin') ||
      (level === 'dean' && req.user.role !== 'dean_admin')
    ) {
      return res.status(403).json({ message: 'You do not have permission to reject at this level' });
    }

    // Update rejection status
    request.approvalStatus[level] = {
      status: 'rejected',
      approverId: req.user._id,
      approverName: req.user.name,
      timestamp: Date.now(),
      comments: reason
    };

    request.rejectionReason = reason;
    request.rejectedByLevel = level;
    request.overallStatus = 'rejected';

    // Add comment
    request.comments.push({
      text: reason,
      authorId: req.user._id,
      authorName: req.user.name,
      action: 'rejected',
      level: level
    });

    await request.save();
    res.status(200).json(request);
  } catch (error) {
    console.error('Error rejecting procurement request:', error);
    res.status(500).json({ message: 'Failed to reject procurement request', error: error.message });
  }
};

// Get procurement statistics
exports.getStatistics = async (req, res) => {
  try {
    // Get all requests (filtered by user role if needed)
    let query = {};

    // Filter requests based on user role
    if (req.user.role === 'user') {
      // Regular users can only see their own requests
      query.userId = req.user._id;
    } else if (req.user.role === 'department_admin') {
      // Department admins can see requests from their department
      query.department = req.user.department;
    }

    const requests = await ProcurementRequest.find(query);

    // Calculate statistics
    const totalRequests = requests.length;
    const approvedRequests = requests.filter(req =>
      req.overallStatus === 'approved' || req.overallStatus === 'fully_approved'
    ).length;
    const pendingRequests = requests.filter(req =>
      req.overallStatus !== 'approved' &&
      req.overallStatus !== 'fully_approved' &&
      req.overallStatus !== 'rejected'
    ).length;
    const rejectedRequests = requests.filter(req =>
      req.overallStatus === 'rejected'
    ).length;

    // Calculate total cost of approved requests
    const totalApprovedCost = requests
      .filter(req => req.overallStatus === 'approved' || req.overallStatus === 'fully_approved')
      .reduce((sum, req) => sum + req.estimatedCost, 0);

    res.status(200).json({
      totalRequests,
      approvedRequests,
      pendingRequests,
      rejectedRequests,
      totalApprovedCost
    });
  } catch (error) {
    console.error('Error fetching procurement statistics:', error);
    res.status(500).json({ message: 'Failed to fetch procurement statistics', error: error.message });
  }
};
