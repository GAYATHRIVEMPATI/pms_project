const express = require('express');
const router = express.Router();

console.log("✅ userRoutes loaded");

router.get('/', (req, res) => {
  console.log("✅ /api/users GET route hit");
  res.json({ message: 'User route is working!' });
});

module.exports = router;
