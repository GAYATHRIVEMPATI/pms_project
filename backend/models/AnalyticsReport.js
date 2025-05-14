const mongoose = require('mongoose');

const analyticsReportSchema = new mongoose.Schema({
  productId: String,
  productName: String,
  department: String,
  category: String,
  expenditureAmount: Number,
  remainingAmount: Number,
  date: { type: Date }, // Use Date type for filtering
  status: { type: String, enum: ['Approved', 'Pending', 'Rejected'], default: 'Pending' }
});

module.exports = mongoose.model('AnalyticsReport', analyticsReportSchema, 'analyticsreports');
