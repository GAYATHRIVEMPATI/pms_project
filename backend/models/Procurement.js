const mongoose = require('mongoose');

const procurementSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  vendor: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], required: true }
});

module.exports = mongoose.model('Procurement', procurementSchema);
