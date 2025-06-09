const express = require('express');
const router = express.Router();
const procurementRequestController = require('../controllers/procurementRequestController');
const authMiddleware = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Create a new procurement request
router.post('/', procurementRequestController.createRequest);

// Get all procurement requests (filtered by user role)
router.get('/', procurementRequestController.getAllRequests);

// Get procurement statistics
router.get('/statistics', procurementRequestController.getStatistics);

// Get a single procurement request by ID
router.get('/:id', procurementRequestController.getRequestById);

// Update a procurement request
router.put('/:id', procurementRequestController.updateRequest);

// Approve a procurement request
router.post('/:id/approve', procurementRequestController.approveRequest);

// Reject a procurement request
router.post('/:id/reject', procurementRequestController.rejectRequest);

module.exports = router;
