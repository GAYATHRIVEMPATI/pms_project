const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  session_id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  login_time: { type: Date, required: true },
  logout_time: { type: Date, default: null },
});

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
