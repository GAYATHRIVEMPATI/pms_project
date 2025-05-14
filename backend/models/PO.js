const mongoose = require('mongoose');

const poSchema = new mongoose.Schema({
  poNumber: { type: String, required: true },
  itemCount: { type: Number, required: true },
});

module.exports = mongoose.model('PO', poSchema);
