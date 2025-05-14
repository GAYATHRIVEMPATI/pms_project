// models/Item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    poNumber: { type: String, required: true },
    itemType: { type: String, required: true },
    itemName: { type: String, required: true },
    itemVariant: { type: String, required: true },
    department: { type: String, required: true },
    itemDescription: { type: String, required: true },
    quantity: { type: Number, required: true },
    receiptDate: { type: String, required: true },
    condition: { type: String, required: true },
    threshold: { type: Number, required: true, default: 10 },
});

module.exports = mongoose.model('Item', itemSchema);
