/*const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

// Get all reports
router.get('/', async (req, res) => {
  const reports = await Report.find();
  res.json(reports);
});

// Add report
router.post('/', async (req, res) => {
  const newReport = new Report(req.body);
  await newReport.save();
  res.json(newReport);
});

module.exports = router;*/

const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const Product = require('../models/Product');

// Get all reports
router.get('/', async (req, res) => {
  const reports = await Report.find();
  res.json(reports);
});

// Add report AND update product allocatedAmount
router.post('/', async (req, res) => {
  const {
    productId,
    productName,
    department,
    category,
    expenditureAmount,
    remainingAmount,
    date
  } = req.body;

  // Create report record
  const newReport = new Report({
    productId,
    productName,
    department,
    category,
    expenditureAmount,
    remainingAmount,
    date
  });
  await newReport.save();

  // Update product's allocatedAmount in products collection
  await Product.findOneAndUpdate(
    { productId },
    { allocatedAmount: remainingAmount }
  );

  res.json({ message: 'Product budget updated successfully in product and reports.' });
});

module.exports = router;

