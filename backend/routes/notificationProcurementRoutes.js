const express = require('express');
const router = express.Router();
const { createProcurement } = require('../controllers/notificationProcurementController');

router.post('/', createProcurement);

module.exports = router;
