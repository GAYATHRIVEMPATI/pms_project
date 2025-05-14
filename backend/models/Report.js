const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  productId: String,
  productName: String,
  department: String,
  category: String,
  expenditureAmount: Number,
  remainingAmount: Number,
  date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Report', ReportSchema);
