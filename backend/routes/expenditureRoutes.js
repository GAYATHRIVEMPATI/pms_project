const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

// Fetch total department expenditure
router.post('/department-total', async (req, res) => {
  const { department } = req.body;
  try {
    console.log("Fetching total for department:", department);
    const reports = await Report.find({ department });
    console.log("Reports found:", reports.length);
    const total = reports.reduce((sum, r) => sum + r.expenditureAmount, 0);
    res.json({ total });
  } catch (err) {
    console.error('Error fetching department total:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Filtered expenditure by productId and/or date range
router.post('/search', async (req, res) => {
  try {
    const { productId, startDate, endDate, department } = req.body;

    const query = {};
    if (department) query.department = department;
    if (productId) query.productId = productId;

    // Ensure valid date filtering
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // include full end day
      query.date = { $gte: start, $lte: end };
    }

    const reports = await Report.find(query);
    const totalExpenditure = reports.reduce((sum, r) => sum + r.expenditureAmount, 0);

    res.json({
      totalExpenditure,
      details: reports
    });
  } catch (err) {
    console.error('Error filtering expenditure:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;