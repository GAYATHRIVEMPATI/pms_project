const Alert = require('../models/Alert');

exports.createAlert = async (req, res) => {
  const { title, description, dateTime } = req.body;
  if (!title || !description || !dateTime) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newAlert = new Alert({ title, description, dateTime });
    await newAlert.save();
    res.status(201).json({ message: 'Alert created successfully' });
  } catch (error) {
    console.error('Error creating alert:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAlerts = async (req, res) => {
    try {
      const alerts = await Alert.find().sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: alerts }); // ✅ updated
    } catch (error) {
      console.error('Error fetching alerts:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };
  

exports.resolveAlert = async (req, res) => {
  const { id } = req.params;

  try {
    const alert = await Alert.findById(id);
    if (!alert) return res.status(404).json({ message: 'Alert not found' });

    alert.resolved = true;
    await alert.save();
    res.status(200).json({ message: 'Alert marked as resolved' });
  } catch (error) {
    console.error('Error resolving alert:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
