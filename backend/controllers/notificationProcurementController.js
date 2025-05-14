const NotificationProcurement = require('../models/NotificationProcurement');

exports.createProcurement = async (req, res) => {
  const { selected, email } = req.body;
  if (!selected || selected.length === 0 || !email) {
    return res.status(400).json({ message: 'Selected items and email are required' });
  }

  try {
    const newEntry = new NotificationProcurement({ selected, email });
    await newEntry.save();
    res.status(201).json({ message: 'Notification procurement data saved successfully' });
  } catch (error) {
    console.error('Error saving notification procurement data:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
