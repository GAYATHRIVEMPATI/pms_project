const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dateTime: { type: String, required: true },
  resolved: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Alert', alertSchema);
