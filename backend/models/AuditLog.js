// models/AuditLog.js
const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema({
  userId: String,
  timestamp: { type: Date, default: Date.now },
  action: String,
  affectedData: String,
  ip: String,
  device: String,
});

const AuditLog = mongoose.model("AuditLog", auditLogSchema);

module.exports = AuditLog;
