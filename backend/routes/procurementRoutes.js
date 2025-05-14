const express = require('express');
const router = express.Router();
const { getAllProcurements } = require('../controllers/procurementController');

router.get('/', getAllProcurements); // GET all procurement requests

module.exports = router;
