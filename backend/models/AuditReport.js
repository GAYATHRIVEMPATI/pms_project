const mongoose = require("mongoose");

const reportDataSchema = new mongoose.Schema({
  requestID: { type: String, required: true },
  department: { type: String },
  amount: { type: String },
  status: { type: String },
  vendor: { type: String },
  contracts: { type: String },
  material: { type: String },
  usage: { type: String },
  compliance: { type: String },
  schedule: { type: String }, // New field for filtering by schedule
  createdAt: { type: Date, default: Date.now }, // Optional: timestamp
});

const auditreportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  data: [reportDataSchema],
});

// Explicitly specify collection name: "auditreports"
const Report = mongoose.model("AuditReport", auditreportSchema, "auditreports");

module.exports = Report;
