const mongoose = require('mongoose');

const notificationProcurementSchema = new mongoose.Schema({
  selected: {
    type: [String],
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('NotificationProcurement', notificationProcurementSchema);
