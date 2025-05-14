const express = require('express');
const router = express.Router();
const Department = require('../models/Department');

// ✅ Route 1: Fetch all departments (used in Budget module)
router.get('/', async (req, res) => {
  try {
    const depts = await Department.find();
    res.status(200).json(depts);
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ error: 'Failed to fetch departments' });
  }
});

// ✅ Route 2: Add a new department (used in Inventory/Admin module)
router.post('/', async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).json({ error: 'Department name is required' });
    }

    const newDepartment = new Department(req.body);
    const savedDepartment = await newDepartment.save();
    res.status(201).json(savedDepartment);
  } catch (error) {
    console.error('Error saving department:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
