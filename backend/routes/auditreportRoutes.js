// routes/reportRoutes.js

const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

// Fetch all predefined reports
router.get("/reports", reportController.getPredefinedReports);

// Download the selected report as CSV
router.get("/download/:reportName", reportController.generateCSVReport);

module.exports = router;
