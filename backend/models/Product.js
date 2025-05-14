const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productId: String,
  productName: String,
  allocatedAmount: Number,
  department: String,
  category: String
});

module.exports = mongoose.model('Product', ProductSchema);
