// controllers/auditController.js
const AuditLog = require("../models/AuditLog");

const getAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find(); // Fetch all logs
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching audit logs" });
  }
};

module.exports = { getAuditLogs };
