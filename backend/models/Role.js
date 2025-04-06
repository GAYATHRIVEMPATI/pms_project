const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  role_id: { type: Number, required: true, unique: true },
  role_name: { type: String, required: true },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Role', roleSchema);
