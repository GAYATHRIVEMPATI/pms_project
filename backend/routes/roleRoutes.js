const express = require('express');
const router = express.Router();
const Role = require('../models/Role');

// Get all roles
router.get('/', async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
